import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Msg } from '@/shared/decorator/msg.decorator';
import { Request, Response } from 'express';
@Injectable()
export class ResInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const message = this.reflector.get(Msg, ctx.getHandler());
    const request = ctx.switchToHttp().getRequest<Request>();
    const response = ctx.switchToHttp().getResponse<Response>();
    if (request.method === 'POST') {
      if (response.statusCode === 201) {
        response.status(200);
      }
    }
    return next.handle().pipe(
      map((data) => {
        return {
          code: 200,
          data: data,
          msg: message ?? 'success',
        };
      }),
    );
  }
}
