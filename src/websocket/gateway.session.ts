import { Injectable } from '@nestjs/common';
import { GameSession } from './models/gameSession';
import { Server } from 'socket.io';
import { Client } from './models/client';
import { quizList } from 'src/utils/quizzes';
import { log } from 'console';
import { StartGame } from './events/startgame.event';

export interface IGatewaySessionManager {
  createNewGame(server: Server);

  joinGame(code: string, client: Client);

  startGame(code: string);
}

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  startGame(code: string) {
    const game = this.sessions.get(code);
    if (game) {
      game.emitEvent('start', 'START GAME...');

      setTimeout(() => {
        new StartGame(game, quizList, (prevIndex) => {
          game.emitEvent('timeout', prevIndex);
        });
      }, 5000);
    }
  }
  joinGame(code: string, client: Client) {
    const game = this.sessions.get(code);
    if (game) {
      game.addClient(client);
      client.to(code).emit('Hello', "I'm in");
      console.log(`Client ${client.id} has join room ${game.name}`);
    }
  }
  createNewGame(server: Server) {
    const code = this.generateCode();
    const newGame = new GameSession(server, code);
    this.sessions.set(code, newGame);
    this.sessions.forEach((item) => console.log(item.gettCode()));
  }

  private generateCode(): string {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  }

  private readonly sessions: Map<string, GameSession> = new Map();
}
