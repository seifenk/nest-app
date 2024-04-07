import { Reflector } from '@nestjs/core';

enum Role {
  admin = 0,
  teacher = 1,
  student = 2,
}

type role = keyof typeof Role;

export const Roles = Reflector.createDecorator<role[]>();
