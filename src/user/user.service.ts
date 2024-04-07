import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
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
}
