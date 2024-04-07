import { IsNotEmpty } from 'class-validator';

export class PswDto {
  @IsNotEmpty()
  oldPsw: string;
  @IsNotEmpty()
  newPsw: string;
}
