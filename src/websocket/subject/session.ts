import { Client } from './client';
import { Namespace, Server } from 'socket.io';

export class GameSession extends Namespace {
  private code: string;

  constructor(server, name) {
    super(server, name);
  }

  gettCode() {
    return this.code;
  }
}
