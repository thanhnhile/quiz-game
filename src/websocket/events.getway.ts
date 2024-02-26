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
import { OnEvent } from '@nestjs/event-emitter';
import { GAME_EVENTS } from 'src/utils/events';

@WebSocketGateway({
  
})
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
    client.name = data.name;
    this.sessionManager.joinGame(data.code, client);
  }

  @OnEvent(GAME_EVENTS.EMITTER_EVENT.NEW_SESSTION)
  handleNewGame(code: string) {
    this.sessionManager.createNewGame(this.server, code);
  }

  @SubscribeMessage('startGame')
  handleStartGame(@MessageBody() data: any) {
    this.sessionManager.startGame(data.code);
  }
}
