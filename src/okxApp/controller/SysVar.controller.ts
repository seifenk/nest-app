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
import { SysVarService } from '../service/SysVar.service';

@Controller('okx/sysVar')
@Public()
export class SysVarController {
  constructor(private readonly sysVarService: SysVarService) {}

  @Get('list')
  findAll() {
    return this.sysVarService.findAll();
  }

  @Post('save')
  save(@Body() body) {
    this.sysVarService.save(body);
  }
}
