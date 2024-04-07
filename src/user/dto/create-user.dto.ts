import { IsOptional, IsUrl, IsNotEmpty } from 'class-validator';

enum Role {
  ADMIN = 0,
  TEACHER = 1,
  STUDENT = 2,
}

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsNotEmpty()
  role: Role;
}
