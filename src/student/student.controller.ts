import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('add')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Post('page')
  findAll(@Body() body) {
    return this.studentService.findAll(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Post('info')
  Info(@Body() body) {
    return this.studentService.findOne(body);
  }

  @Post('update')
  async UpdateOne(@Body() body: CreateStudentDto, @Req() req) {
    const stu = await this.studentService.findOneBy({
      user: { id: req.user.id },
    });
    if (stu) body.id = stu.id;
    body.user = { id: req.user.id };
    return this.studentService.save(body);
  }
}
