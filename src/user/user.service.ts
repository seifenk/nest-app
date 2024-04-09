import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { QueryUtils } from '@/repositories/select.repository';

@Injectable()
export class UserService {
  private queryUtils: QueryUtils;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.queryUtils = new QueryUtils(this.userRepository);
  }
  async findAll(body) {
    const { pageNum, pageSize, ...query } = body;
    const result = await this.userRepository.findAndCount({
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

  findOneBy(body) {
    return this.userRepository.findOneBy(body);
  }

  findOne(data) {
    return this.userRepository.findOne(data);
  }

  addOne(user) {
    return this.userRepository.save(user);
  }

  updateOne(id, body) {
    this.userRepository.update(id, body);
  }

  findAllbyTest(start: number, pageSize: number) {
    return this.queryUtils.findAllUser(start, pageSize);
  }
}
