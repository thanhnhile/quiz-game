import { Injectable } from '@nestjs/common';
import { GameSession } from './subject/session';
import { randomUUID } from 'crypto';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export interface IGatewaySessionManager {
  createNewGame(server: Server);
}

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  createNewGame(server: Server) {
    const code = randomUUID();
    this.sessions.set(code, new GameSession(server, code));
  }
  private readonly sessions: Map<string, GameSession> = new Map();
}
