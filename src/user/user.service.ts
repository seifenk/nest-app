import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import PaginationService from '@/shared/helper/pagination';

@Injectable()
export class UserService {
  private paginationService: PaginationService<User>;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.paginationService = new PaginationService(this.userRepository);
  }
  async findAll(body) {
    return this.paginationService.paginationResult(body);
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
