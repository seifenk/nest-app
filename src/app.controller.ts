import { Controller, All } from '@nestjs/common';
import { AppService } from '@/app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
  @All()
  hello() {
    return 'nothing';
  }
}
