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
@Injectable()
export class ResInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const message = this.reflector.get(Msg, ctx.getHandler());
    const request = ctx.switchToHttp().getRequest<Request>();
    const response = ctx.switchToHttp().getResponse<Response>();
    if (request.method === 'POST') {
      if (response.status === 201) ctx.switchToHttp().getResponse().status(200);
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
