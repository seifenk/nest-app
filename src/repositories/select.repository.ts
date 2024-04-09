import { Repository } from 'typeorm';

export class QueryUtils {
  private entities: Repository<any>;
  constructor(entities: Repository<any>) {
    this.entities = entities;
  }

  /**
   * 查询所有用户
   * @param pageNum 页码
   * @param pageSize 每页数量
   * @param query 查询条件
   * @returns {Promise {total: number, pageNum: number, data: any} }
   */
  async findAllUser(pageNum: number = 1, pageSize: number = 15, query?: any) {
    const res = await this.entities.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      where: query,
    });

    return {
      total: res[1],
      pageNum: pageSize,
      data: res[0],
    };
  }
}
