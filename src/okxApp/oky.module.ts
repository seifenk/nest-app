import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; //已找到开源SDK
import { WsGateway } from './gateway/ws.gateway';
import { ApiService } from './service/api.service';
import { InstrumentController } from './controller/instrument.controller';
import { TasksService } from './service/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicatorService } from './service/Indicators.service';
import { SysVarController } from './controller/SysVar.controller';
import { SysVarService } from './service/SysVar.service';
import { Indicator } from './entities/Indicator.entity';
import { SysVar } from './entities/SysVar.entity';
import { RestClient, WebsocketClient } from 'okx-api';

@Module({
  imports: [
    TypeOrmModule.forFeature([Indicator, SysVar], 'okx'),
    HttpModule.register({
      baseURL: 'https://aws.okx.com/',
      headers: {
        'OK-ACCESS-KEY': '6b5070d9-467d-4af4-b88b-39256f38fc3a',
        'OK-ACCESS-TIMESTAMP': new Date(),
        'OK-ACCESS-PASSPHRASE': 'F48E829239C150579C659B7CF2CAF632',
      } as any,
    }),
  ],
  controllers: [InstrumentController, SysVarController],
  providers: [
    WsGateway,
    ApiService,
    TasksService,
    IndicatorService,
    SysVarService,
    { provide: RestClient, useFactory: () => new RestClient(null, 'aws') },
    {
      provide: WebsocketClient,
      useFactory: () =>
        new WebsocketClient({
          market: 'aws',
          reconnectTimeout: 1000,
        }),
    },
  ],
})
export class OkyModule {}
