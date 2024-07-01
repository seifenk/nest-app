import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';
import { TypeormFilter } from './shared/filter/typeorm.filter';
import './shared/helper/pagination'; //注入分页助手

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter(), new TypeormFilter());
  app.enableCors();
  await app.listen(3010);
}
bootstrap();
