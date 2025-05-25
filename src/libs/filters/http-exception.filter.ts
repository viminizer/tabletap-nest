import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class FHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const responseBody = exception.getResponse();
    const message =
      typeof responseBody === 'string' ? responseBody : responseBody['message'];

    response.status(status).json({
      message: typeof message === 'string' ? message : message[0],
      statusCode: status,
    });
  }
}
