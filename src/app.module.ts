import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StuModule } from './stuApp/stu.module';
import { LoggerMiddleware } from './shared/middleware/logger';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './shared/guard/jwt.guard';
import { ResInterceptor } from './shared/interceptor/response.interceptor';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '8.218.136.226',
      port: 3306,
      username: 'blogSys',
      password: 'xTRr7shLc7LyEMBK',
      database: 'blogSys',
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),

    StuModule,

    AuthModule,

    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
