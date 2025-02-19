import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ModuleExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = ['Internal server error'];

    if (exception instanceof HttpException) {
      const response = exception.getResponse() as string | any;
      status = exception.getStatus();

      if (typeof response === 'string') {
        message = [response];
      }

      if (!!response.message) {
        message = Array.isArray(response.message)
          ? response.message
          : [response.message];
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
