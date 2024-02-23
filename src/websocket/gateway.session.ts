import { Injectable, NotFoundException } from '@nestjs/common';
import { GameSession } from './models/gameSession';
import { Server } from 'socket.io';
import { Client } from './models/client';
import { StartGame } from './events/startgame.event';
import { GAME_EVENTS } from 'src/utils/events';
import { GamesService } from 'src/games/games.service';
import { Game } from 'src/games/game.interface';
import { now } from 'mongoose';

export interface IGatewaySessionManager {
  createNewGame(server: Server, code: string);

  joinGame(code: string, client: Client);

  startGame(code: string);
}

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  constructor(private gameService: GamesService) {}

  async startGame(code: string) {
    const gameSession = this.sessions.get(code);
    if (gameSession) {
      const gameModel: Game = await this.gameService.findByCode(code);
      console.log(gameModel);
      await this.gameService.updateStartDatetime(gameModel._id);
      this.countDown(gameSession, 5, () => {
        new StartGame(
          gameSession,
          gameModel.questionList.questionList,
          (prevIndex) => {
            gameSession.emitEvent(
              GAME_EVENTS.QUESTION_TIME_OUT,
              `Time out for question ${prevIndex}`,
            );
          },
        );
      });
    } else {
      throw new NotFoundException('Game sesstion does not exist');
    }
  }
  async joinGame(code: string, client: Client) {
    const game = this.sessions.get(code);
    if (game) {
      game.addClient(client);
      game.emitEvent(GAME_EVENTS.NEW_JOIN, `Client ${client.id} has join game`);
      console.log(`Client ${client.name} has join game ${game.gettCode()}`);
      await this.gameService.addClient(code, client);
    }
  }
  createNewGame(server: Server, code: string) {
    const newGame = new GameSession(server, code);
    this.sessions.set(code, newGame);
    console.log(newGame.gettCode());
  }

  countDown(game: GameSession, second: number, afterCb: Function) {
    if (second == 0) {
      afterCb();
    } else {
      game.emitEvent(GAME_EVENTS.COUNT_DOWN, second);
      setTimeout(() => {
        this.countDown(game, second - 1, afterCb);
      }, 1000);
    }
  }

  private readonly sessions: Map<string, GameSession> = new Map();
}
