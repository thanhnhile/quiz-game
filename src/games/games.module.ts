import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GameProviders } from './game.schema';
import { GamesController } from './games.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EventGetway } from './events.getway';
import { SERVICES } from 'src/utils/constants';
import { GatewaySessionManager } from './gateway.session';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        global: true,
      }),
    }),
  ],
  providers: [
    GamesService,
    ...GameProviders,
    EventGetway,
    {
      provide: SERVICES.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
  controllers: [GamesController],
  exports: [GamesService, ...GameProviders, EventGetway],
})
export class GamesModule {}
