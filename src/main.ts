import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  log('App is running on ', process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();
