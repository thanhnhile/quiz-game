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
    console.log("Disonnected from ", { id: client.id });
    const gameCode = client.handshake.query.gameCode?.toString();
    if (gameCode) {
      this.sessionManager.leaveGameSession(gameCode, client.id);
      client.leave(gameCode);
      this.io.to(gameCode).emit(GAME_EVENTS.LEAVE, { clientId: client.id });
      console.log(`Client ${client.id} has leave game ${gameCode}`);
    }
  }
  handleConnection(client: Client, ...args: any[]) {
    console.log("Connected from ", { id: client.id });
    const gameCode = client.handshake.query.gameCode?.toString();
    if (gameCode) {
      this.sessionManager.joinGameSession(gameCode, client);
      client.join(gameCode);
      console.log(`Client ${client.id} has join game ${gameCode}`);
    }
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

   @OnEvent(GAME_EVENTS.EVENT_EMITTER.START)
   async handleStartGame(@MessageBody() gameModel: Game) {
     console.log(gameModel);
     const { code } = gameModel;
     const gameSession = this.sessionManager.getSession(code);
     if (gameSession.getNumberOfClients() > 3) {
       this.io.to(code).emit(GAME_EVENTS.START);
       this.countDown(code, 5, () => {
         new StartGame(
           this.io.to(code),
           gameModel.questionList.questionList,
           gameModel.timeLimit,
           (prevIndex) => {
             this.io
               .to(code)
               .emit(
                 GAME_EVENTS.QUESTION_TIME_OUT,
                 `Time out for question ${prevIndex}`
               );
           }
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
