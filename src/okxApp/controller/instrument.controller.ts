import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Public } from '@/shared/decorator/public.decorator';
import { ApiService } from '../service/api.service';
@Controller('okx')
@Public()
export class InstrumentController {
  constructor(private readonly apiService: ApiService) {}

  @Get('instrument')
  findAll() {
    return this.apiService.findAll();
  }
}
