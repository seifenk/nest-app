import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    // 响应 请求对象
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    response.status(200).json({
      code: 500,
      path: request.url,
      msg: exception.message,
    });
  }
}
