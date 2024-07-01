import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findAll(body) {
    PageHelper.paginateBy(this.userRepository, body);
  }

  findOneBy(body) {
    return this.userRepository.findOneBy(body);
  }

  addOne(user) {
    return this.userRepository.save(user);
  }

  updateOne(id, body) {
    this.userRepository.update(id, body);
  }
}
