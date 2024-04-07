import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
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
    const { pageSize, pageNum, ...data } = body;
    const result = await this.stuRepository.findAndCount({
      skip: pageSize * (pageNum - 1),
      take: pageSize,
      where: data,
    });
    return {
      data: result[0],
      total: result[1],
      pageNum,
    };
  }

  findOne(body) {
    return this.stuRepository.findOne(body);
  }

  updateOne(id, body) {
    this.stuRepository.update(id, body);
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }

  save(stu) {
    return this.stuRepository.save(stu);
  }
}
