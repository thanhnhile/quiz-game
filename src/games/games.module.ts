import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GameProviders } from './game.schema';
import { GamesController } from './games.controller';

@Module({
  providers: [GamesService, ...GameProviders],
  controllers: [GamesController],
})
export class GamesModule {}
