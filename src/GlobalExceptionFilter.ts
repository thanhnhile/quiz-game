import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { GAME_EVENTS } from './utils/events';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (exception instanceof NotFoundException) {
      response.status(404).json({
        statusCode: 404,
        message: exception.message,
      });
    }
  }
}

@Catch(WsException)
export class WsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    const error = exception.getError();
    const details = typeof error === 'string' ? { message: error } : error;

    client.emit(GAME_EVENTS.ERROR, details);
  }
}
