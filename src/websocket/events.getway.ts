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
import { Client } from './models/client';
import { Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets/interfaces/hooks';

@WebSocketGateway()
export class EventGetway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(SERVICES.GATEWAY_SESSION_MANAGER)
    private sessionManager: IGatewaySessionManager,
  ) {}

  handleDisconnect(client: Client) {
    console.log('Disonnected from ', { id: client.id });
  }
  handleConnection(client: Client, ...args: any[]) {
    console.log('Connected from ', { id: client.id });
  }

  @SubscribeMessage('join')
  handleJoinGame(@MessageBody() data: any, @ConnectedSocket() client: Client) {
    this.sessionManager.joinGame(data.code, client);
  }

  @SubscribeMessage('newGame')
  handleNewGame(@MessageBody() data: any, @ConnectedSocket() client: Client) {
    this.sessionManager.createNewGame(this.server);
  }

  @SubscribeMessage('startGame')
  handleStartGame(@MessageBody() data: any, @ConnectedSocket() client: Client) {
    this.sessionManager.startGame(data.code);
  }

  logClient(client: Client) {
    console.log({ id: client.id });
  }
}
