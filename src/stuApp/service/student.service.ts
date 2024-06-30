import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { PaginationService } from '@/shared/helper/pagination';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private stuRepository: Repository<Student>,
  ) {}

  async create(student) {
    const stu = await this.stuRepository.save(student);
    if (stu) return true;
  }

  async findAll(body) {
    const { pageNum, pageSize, ...where } = body;
    return await PaginationService.paginate(this.stuRepository, {
      pageNum,
      pageSize,
      relations: ['class', 'user'],
      where: where,
    });
  }

  findOne(body) {
    return this.stuRepository.findOne({
      relations: ['class', 'user'],
      where: body,
    });
  }

  findOneBy(body) {
    return this.stuRepository.findOneBy(body);
  }

  updateOne(id, body) {
    this.stuRepository.update(id, body);
  }

  save(stu) {
    return this.stuRepository.save(stu);
  }
}
