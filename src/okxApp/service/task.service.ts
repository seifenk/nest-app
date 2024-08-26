import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { IndicatorService } from './Indicators.service';
import { ApiService } from './api.service';
@Injectable()
export class TasksService {
  constructor(
    private indicatorService: IndicatorService,
    private apiService: ApiService,
  ) {}

  private readonly logger = new Logger(TasksService.name);

  @Timeout(5000)
  handleCron() {
    this.logger.debug('Called once after 5 seconds');
    console.log(process.env.NODE_ENV);
    this.apiService.find();
    // this.indicatorService.update_MA5_BOLL_ALL();
    // this.indicatorService.createAll();
    // this.indicatorService.findOneBy();
    // this.indicatorService.updateList();
    // this.indicatorService.addIndicatorAll();
  }
}
