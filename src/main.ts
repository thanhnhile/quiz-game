import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { ValidationPipe } from '@nestjs/common';
import SocketIOAdapter from './socket-io-adapter';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './GlobalExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  log('App is running on ', process.env.PORT);
  app.enableCors({
    origin: `http://localhost:${process.env.CLIENT_PORT}`, // Change this to the origin of your client application
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  const configService = app.get(ConfigService);
  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));
  await app.listen(process.env.PORT);
}
bootstrap();
