import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RestClient } from 'okx-api';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysVar } from '../entities/SysVar.entity';
@Injectable()
export class SysVarService {
  constructor(
    @InjectRepository(SysVar, 'okx')
    private sysVarRepo: Repository<SysVar>,
  ) {}

  createAll() {}

  save(vars) {
    this.sysVarRepo.save(vars);
  }

  findAll() {
    return this.sysVarRepo.find();
  }
}
