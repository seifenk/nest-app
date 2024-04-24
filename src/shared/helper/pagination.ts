import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService<T> {
  constructor(private repository: Repository<T>) {}
  static async paginate<T>(
    repository: Repository<T>,
    { pageNum = 1, pageSize = 10, ...options },
  ) {
    const [list, total] = await repository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      ...options,
    });
    return {
      total,
      pageNum: pageNum,
      data: list,
    };
  }
  static async paginateBy<T>(repository: Repository<T>, data) {
    const { pageNum = 1, pageSize = 10, ...where } = data;
    const [list, total] = await repository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      where: where,
    });
    return {
      total,
      pageNum: pageNum,
      data: list,
    };
  }
}
