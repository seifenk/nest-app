import { Module, Global } from '@nestjs/common';
import PaginationService from './helper/pagination';
@Global()
@Module({
  imports: [],
  providers: [PaginationService],
  exports: [PaginationService],
})
export class SharedModule {}
