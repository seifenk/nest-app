import { Controller, Post, Body, Req, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { StudentService } from '@/student/student.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Msg } from '@/shared/decorator/msg.decorator';
import { PswDto } from './dto/user.dto';
import { Public } from '@/shared/decorator/public.decorator';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private studentService: StudentService,
  ) {}

  @Post('page')
  findAll(@Body() body) {
    return this.userService.findAll(body);
  }

  @Msg('修改成功')
  @Post('setPsw')
  async setPsw(@Body() body: PswDto, @Req() req) {
    const result = await this.userService.findOne({
      id: req.user.id,
      password: body.oldPsw,
    });
    if (!result) throw new HttpException('原密码错误', 400);
    this.userService.updateOne(req.user.id, { password: body.newPsw });
  }

  @Public()
  @Msg('注册成功')
  @Post('add')
  addOne(@Body() user: CreateUserDto) {
    return this.userService.addOne(user);
  }

  @Post('find')
  findOne(@Body() body) {
    return this.userService.findOne(body);
  }

  @Msg('修改成功')
  @Post('setProfile')
  async setProfile(@Body() body, @Req() req) {
    const student = await this.studentService.findOne({
      where: { user: req.user.id },
    });
    if (!student) this.studentService.save({ user: req.user.id, ...body });
    this.studentService.updateOne(student.id, {
      ...body,
    });
  }
}
