import { IsEmail } from 'class-validator';

export class CreateStudentDto {
  [key: string]: any;
  @IsEmail()
  email: string;
}
