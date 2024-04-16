import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';
import { TypeormFilter } from './shared/filter/typeorm.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter(), new TypeormFilter());
  app.enableCors();
  await app.listen(3010);
}
bootstrap();
