import { Namespace } from 'socket.io';
import { Client } from './client';

export class GameSession extends Namespace {
  private code: string;

  constructor(server, code) {
    super(server, code);
    this.code = code;
  }

  gettCode() {
    return this.code;
  }

  addClient(client: Client){
    client.join(this.code);
  }

  emitEvent(event: string, message: any){
    this.server.to(this.code).emit(event, message);
  }

}
