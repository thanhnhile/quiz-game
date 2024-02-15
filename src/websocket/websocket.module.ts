import { Module } from '@nestjs/common';
import { GatewaySessionManager } from './gateway.session';
import { EventGetway } from './events.getway';
import { SERVICES } from 'src/utils/constants';

@Module({
  providers: [EventGetway],
  exports: [EventGetway],
})
export class WebsocketModule {}
