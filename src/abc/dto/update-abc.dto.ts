import { PartialType } from '@nestjs/mapped-types';
import { CreateAbcDto } from './create-abc.dto';

export class UpdateAbcDto extends PartialType(CreateAbcDto) {
  id: number;
}
