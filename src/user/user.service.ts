import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { PaginationService } from '@/shared/helper/pagination';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findAll(body) {
    PaginationService.paginateBy(this.userRepository, body);
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
