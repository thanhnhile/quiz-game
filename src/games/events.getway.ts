import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IGatewaySessionManager } from './gateway.session';
import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SERVICES } from 'src/utils/constants';
import Client from '../websocket/models/client';
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
import { GameAnswerDto } from './game.dto';

@WebSocketGateway()
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
    if (client.gameCode) {
      this.sessionManager.leaveGameSession(client.gameCode, client.id);
      client.leave(client.gameCode);
      this.io.to(client.gameCode).emit(GAME_EVENTS.LEAVE, client.name);
      console.log(`Client ${client.name} has leave game ${client.gameCode}`);
      ///remove database
      this.gameService.leaveGame(client.gameCode, client.name);
    }
  }
  handleConnection(client: Client, ...args: any[]) {
    console.log('Connected from ', { id: client.id });
    if (client.gameCode) {
      this.sessionManager.joinGameSession(client.gameCode, client);
      client.join(client.gameCode);
      console.log(`Client ${client.id} has join game ${client.gameCode}`);
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

  @SubscribeMessage(GAME_EVENTS.RECEIVE_ANSWER)
  async handleReceiveAnswer(
    @MessageBody() answerDto: GameAnswerDto,
    @ConnectedSocket() client: Client,
  ) {
    if(!client.isHost){
      const score = await this.gameService.submitAnswer(client.gameCode, client.name, answerDto);
      client.latestScore = score;
    }
      
  }

  async sendRankingBoard(code: string, hasNextQuestion: boolean) {
    const currentParticipants: Participant[] =
      await this.gameService.getGameParticipants(code);
    const sortedData = currentParticipants.sort((a, b) => b.score - a.score);
    const rankingData = {
      hasNextQuestion,
      data: sortedData,
    };
    this.io.to(code).emit(GAME_EVENTS.UPDATE_RANKING, rankingData);
  }

  @OnEvent(GAME_EVENTS.EVENT_EMITTER.START)
  async handleStartGame(@MessageBody() gameModel: Game) {
    const { code } = gameModel;
    const gameSession = this.sessionManager.getSession(code);
    if (gameSession.getNumberOfClients() > 0) {
      this.gameService.updateStartDatetime(gameModel._id);
      this.io.to(code).emit(GAME_EVENTS.START);
      gameSession.startEvent = new StartGame(
        this.io.to(code),
        gameModel.questionList.questionList,
        async (hasNextQuestion: boolean) => {
          await this.sendRankingBoard(code, hasNextQuestion),
            !hasNextQuestion &&
              this.gameService.updateEndDatetime(gameModel._id);
        },
      );
      setTimeout(() => {
        this.countDown(code, 5, () => {
          gameSession.updateCurrentIndex();
        });
      }, 3000);
    }
  }
  @SubscribeMessage(GAME_EVENTS.NEXT_QUESTION)
  handleNextQuestion(@ConnectedSocket() client: Client) {
    if (client.isHost) {
      const gameSession = this.sessionManager.getSession(client.gameCode);
      gameSession.updateCurrentIndex();
    } else {
      throw new UnauthorizedException('Need host permission');
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
