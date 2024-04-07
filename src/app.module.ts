import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TeacherModule } from './teacher/teacher.module';
import { LoggerMiddleware } from './middleware/logger';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { ClassModule } from './class/class.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './guard/jwt.guard';
import { ResInterceptor } from './interceptor/response.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'blogSys',
      entities: [],
      autoLoadEntities: true,
    }),

    UserModule,

    TeacherModule,

    CourseModule,

    SubjectModule,

    StudentModule,

    ClassModule,

    AuthModule,
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
