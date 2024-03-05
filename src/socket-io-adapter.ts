import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';
import Client from './websocket/models/client';

class SocketIOAdapter extends IoAdapter {
  constructor(
    private app: INestApplication,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: any) {
    const clientPort = this.configService.get<number>('CLIENT_PORT');
    const cors = {
      cors: {
        origin: `http://localhost:${clientPort}`,
      },
      transports: ['websocket', 'polling'],
    };
    const optionsWithCORS = {
      ...options,
      cors,
    };
    const jwtService = this.app.get(JwtService);
    const server: Server = super.createIOServer(port, optionsWithCORS);

    server.of('/').use(createTokenMiddleware(jwtService));

    return server;
  }
}

const createTokenMiddleware = (jwtService: JwtService) => {
  return (client: Client, next) => {
    const token =
      client.handshake.auth.token || client.handshake.headers['token'];
    try {
      if (token) {
        const payload = jwtService.verify(token);
        console.log('PAYLOAD: ', payload);
        client.name = payload.name;
        client.gameCode = payload.code;
      }
      next();
    } catch (error) {
      console.log(error);
      next(new Error('FORBIDDEN'));
    }
  };
};

export default SocketIOAdapter;
