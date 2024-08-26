import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';
import { TypeormFilter } from './shared/filter/typeorm.filter';
import { WsAdapter } from '@nestjs/platform-ws';
import './shared/helper/pagination'; //注入分页助手

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('REST_PORT');
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter(), new TypeormFilter());
  app.enableCors();
  await app.listen(port);
}
bootstrap();
