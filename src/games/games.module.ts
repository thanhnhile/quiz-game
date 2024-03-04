import { Module } from "@nestjs/common";
import { GamesService } from "./games.service";
import { GameProviders } from "./game.schema";
import { GamesController } from "./games.controller";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
      }),
    }),
  ],
  providers: [GamesService, ...GameProviders],
  controllers: [GamesController],
  exports: [GamesService, ...GameProviders],
})
export class GamesModule {}
