import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import { Subject } from './entities/subject.entity';
import { Class } from './entities/class.entity';
import { Course } from './entities/course.entity';
import { Teacher } from './entities/teacher.entity';

import { UserController } from './controller/user.controller';
import { StudentController } from './controller/student.controller';
import { ClassController } from './controller/class.controller';
import { TeacherController } from './controller/teacher.controller';
import { CourseController } from './controller/course.controller';
import { SubjectController } from './controller/subject.controller';

import { UserService } from './service/user.service';
import { StudentService } from './service/student.service';
import { TeacherService } from './service/teacher.service';
import { CourseService } from './service/course.service';
import { SubjectService } from './service/subject.service';
import { ClassService } from './service/class.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Student, Class, Subject, Course, Teacher]),
  ],
  controllers: [
    UserController,
    StudentController,
    ClassController,
    TeacherController,
    CourseController,
    SubjectController,
  ],
  providers: [
    UserService,
    StudentService,
    TeacherService,
    CourseService,
    SubjectService,
    ClassService,
  ],
  exports: [UserService, TypeOrmModule],
})
export class StuModule {}
