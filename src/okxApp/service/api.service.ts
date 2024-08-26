import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RestClient } from 'okx-api';

@Injectable()
export class ApiService {
  constructor(
    private httpService: HttpService,
    private restClient: RestClient,
  ) {}

  findAll() {
    return this.restClient.getMarkPriceCandles('BTC-USD-SWAP');
  }
  async find() {
    const res = await this.restClient.getMarginLendingRatio({
      ccy: 'BTC',
      period: '5m',
    });
    console.log(res, 1);
  }
}
