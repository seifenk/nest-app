import { Reflector } from '@nestjs/core';

export const Msg = Reflector.createDecorator<string>();
