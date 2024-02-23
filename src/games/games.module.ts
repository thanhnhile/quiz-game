import { Module } from "@nestjs/common";
import { GamesService } from "./games.service";
import { GameProviders } from "./game.schema";
import { GamesController } from "./games.controller";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [GamesService, ...GameProviders],
  controllers: [GamesController],
  exports: [GamesService, ...GameProviders],
})
export class GamesModule {}
