import { Module } from '@nestjs/common';
import { GatewaySessionManager } from './gateway.session';
import { EventGetway } from './events.getway';
import { SERVICES } from 'src/utils/constants';

@Module({
  providers: [
    EventGetway,
    {
      provide: SERVICES.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
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
