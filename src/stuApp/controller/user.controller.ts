import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  HttpException,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Msg } from '@/shared/decorator/msg.decorator';
import { PswDto } from '../dto/user.dto';
import { Public } from '@/shared/decorator/public.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('page')
  findAll(@Body() body) {
    return this.userService.findAll(body);
  }

  @Msg('修改成功')
  @Post('setPsw')
  async setPsw(@Body() body: PswDto, @Req() req) {
    const result = await this.userService.findOneBy({
      id: req.user.id,
      password: body.oldPsw,
    });
    if (!result) throw new HttpException('原密码错误', 403);
    this.userService.updateOne(req.user.id, { password: body.newPsw });
  }

  @Public()
  @Msg('注册成功')
  @Post('add')
  addOne(@Body() user: CreateUserDto) {
    return this.userService.addOne(user);
  }

  @Get('info')
  getProfile(@Req() req) {
    return req.user;
  }
}
