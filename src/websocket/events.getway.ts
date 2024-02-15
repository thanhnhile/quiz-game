import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IGatewaySessionManager } from './gateway.session';
import { Inject } from '@nestjs/common';
import { SERVICES } from 'src/utils/constants';
import { Client } from './subject/client';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventGetway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor() {}

  handleDisconnect(client: Client) {
    console.log('Disonnected from ', { id: client.id });
  }
  handleConnection(client: Client, ...args: any[]) {
    console.log('Connected from ', { id: client.id });
  }

  @SubscribeMessage('join')
  handleJoinGame(@MessageBody() data: any, @ConnectedSocket() client: Client) {
    this.logClient(client);
    console.log(data);
    client.j;
    this.server.to;
  }

  logClient(client: Client) {
    console.log({ id: client.id });
  }
}
