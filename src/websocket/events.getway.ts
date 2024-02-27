import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IGatewaySessionManager } from './gateway.session';
import { Inject } from '@nestjs/common';
import { SERVICES } from 'src/utils/constants';
import Client from './models/client';
import { Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets/interfaces/hooks';
import { OnEvent } from '@nestjs/event-emitter';
import { GAME_EVENTS } from 'src/utils/events';
import { GamesService } from 'src/games/games.service';
import { Game, Participant } from 'src/games/game.interface';
import { StartGame } from './events/startgame.event';

@WebSocketGateway({
  // namespace: "quiz-game",
  cors: {
    origin: 'http://localhost:3000',
  },
  transports: ['websocket', 'polling'],
})
export class EventGetway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  io: Server;

  constructor(
    @Inject(SERVICES.GATEWAY_SESSION_MANAGER)
    private sessionManager: IGatewaySessionManager,
    private gameService: GamesService,
  ) {}

  handleDisconnect(client: Client) {
    console.log('Disonnected from ', { id: client.id });
  }
  handleConnection(client: Client, ...args: any[]) {
    console.log('Connected from ', { id: client.id });
    const gameCode = client.handshake.query.gameCode?.toString();
    if (gameCode) {
      this.sessionManager.joinGameSession(gameCode, client);
      client.join(gameCode);
      console.log(`Client ${client.id} has join game ${gameCode}`);
    }
  }

  @OnEvent(GAME_EVENTS.EVENT_EMITTER.NEW_JOIN_CREATED)
  async handleNewJoinGame(newJoinData: {
    code: string;
    newParticipant: Participant;
  }) {
    const { code, newParticipant } = newJoinData;
    this.io.to(code).emit(GAME_EVENTS.NEW_JOIN, newParticipant);
  }

  @OnEvent(GAME_EVENTS.EVENT_EMITTER.NEW_GAME_CREATED)
  handleNewGame(code: string) {
    this.sessionManager.addSession(code);
  }

  @SubscribeMessage('startGame')
  async handleStartGame(@MessageBody() data: any) {
    const { code } = data;
    const gameSession = this.sessionManager.getSession(data.code);
    if (gameSession.getClients().length > 0) {
      const gameModel: Game = await this.gameService.findByCode(code);
      console.log(gameModel);
      await this.gameService.updateStartDatetime(gameModel._id);
      this.countDown(code, 5, () => {
        new StartGame(
          this.io.to(code),
          gameModel.questionList.questionList,
          (prevIndex) => {
            this.io
              .to(code)
              .emit(
                GAME_EVENTS.QUESTION_TIME_OUT,
                `Time out for question ${prevIndex}`,
              );
          },
        );
      });
    }
  }

  countDown(code, second: number, afterCb: Function) {
    if (second == 0) {
      afterCb();
    } else {
      this.io.to(code).emit(GAME_EVENTS.GAME_STARTING, second);
      setTimeout(() => {
        this.countDown(code, second - 1, afterCb);
      }, 1000);
    }
  }
}
