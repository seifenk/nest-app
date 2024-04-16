import { Repository } from 'typeorm';

class PaginationService<T> {
  constructor(private repository: Repository<T>) {}

  async paginationResult(body) {
    const { pageNum = 1, pageSize = 10, ...query } = body;
    const result = await this.repository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      where: query,
    });
    return {
      total: result[1],
      pageNum: pageNum,
      data: result[0],
    };
  }
}

export default PaginationService;
