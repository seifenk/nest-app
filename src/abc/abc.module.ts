import { Module } from '@nestjs/common';
import { AbcService } from './abc.service';
import { AbcGateway } from './abc.gateway';

@Module({
  providers: [AbcGateway, AbcService],
})
export class AbcModule {}
