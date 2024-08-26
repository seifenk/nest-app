import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestClient } from 'okx-api';
import { Indicator } from '../entities/Indicator.entity';
import { calculateBoll, calculateMA5 } from '../utils/index';
import { ALL_PROJECT_NAME, ALL_CHANNEL } from '../enums';
import { resolve } from 'path';
@Injectable()
export class IndicatorService {
  constructor(
    private httpService: HttpService,
    private restClient: RestClient,
    @InjectRepository(Indicator, 'okx')
    private repository: Repository<Indicator>,
  ) {}

  async createOne(project: string, channel: string) {
    const isFind = await this.repository.findOneBy({ project, channel });
    if (isFind) {
      console.log(project + channel + '已存在');
      return;
    }
    const res = await this.restClient.getCandles(
      `${project}-USDT-SWAP`,
      channel,
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    const indicators: Indicator[] = [];
    res.forEach((item) => {
      const obj: Partial<Indicator> = {
        id: `${project}-USDT-SWAP-${channel}-${item[0]}`,
        project,
        timestamp: item[0],
        open_price: Number(item[1]),
        high_price: Number(item[2]),
        low_Price: Number(item[3]),
        close_price: Number(item[4]),
        channel,
      };

      indicators.push(obj as Indicator);
    });

    await this.repository.save(indicators);
    console.log(project + channel + '插入成功');
  }

  async createAll() {
    for (const p of ALL_PROJECT_NAME) {
      for (const channel of ALL_CHANNEL) {
        await this.createOne(p, channel);
      }
    }
  }

  async update_MA5_BOLL_One(project: string, channel: string) {
    const isFind = await this.repository.findOneBy({ project, channel });

    if (isFind) {
      console.log(project + channel + '已存在');
      return;
    }

    const list = await this.repository.find({
      where: { project, channel },
      order: { timestamp: 'DESC' },
    });
    list.forEach((item, index) => {
      if (list.length - index >= 5) {
        const arr: number[] = [];
        for (let i = index; i < index + 5; i++) {
          arr.push(list[i].close_price);
        }

        item.ma5 = calculateMA5(arr);
      }

      if (list.length - index >= 20) {
        const arr: number[] = [];
        for (let i = index; i < index + 20; i++) {
          arr.push(list[i].close_price);
        }
        const result = calculateBoll(arr);
        item.bollUp = result[0];
        item.ma20 = result[1];
        item.bollLow = result[2];
      }
    });
    await this.repository.save(list);
    console.log(project, channel, 'down');
  }

  update_MA5_BOLL_ALL() {
    ALL_PROJECT_NAME.forEach((p) => {
      ALL_CHANNEL.forEach((c) => {
        this.update_MA5_BOLL_One(p, c);
      });
    });
  }

  async findOneBy() {
    const res = await this.repository.findOneBy({
      project: 'UXLINK',
      channel: '15m',
    });
    console.log(res);
  }
}
