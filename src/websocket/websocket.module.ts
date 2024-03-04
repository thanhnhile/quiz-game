import { Module } from "@nestjs/common";
import { GatewaySessionManager } from "./gateway.session";
import { EventGetway } from "./events.getway";
import { SERVICES } from "src/utils/constants";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { GamesModule } from "src/games/games.module";
import { GamesService } from "src/games/games.service";

@Module({
  imports: [EventEmitterModule.forRoot(), GamesModule],
  providers: [
    EventGetway,
    {
      provide: SERVICES.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
    GamesService,
  ],
  exports: [
    EventGetway,
    {
      provide: SERVICES.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
})
export class WebsocketModule {}
