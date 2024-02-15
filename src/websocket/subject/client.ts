import { Socket } from 'socket.io';

export class Client extends Socket {
  private name: string;

  getName() {
    return this.name;
  }
}
