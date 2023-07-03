/* eslint-disable @typescript-eslint/no-unused-vars */
import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class GlobalExceptionFilter implements RpcExceptionFilter {
  catch(exception: unknown, _host: ArgumentsHost): Observable<any> {
    if (exception instanceof RpcException) {
      return throwError(() => exception.getError());
    }
    throw exception;
  }
}
