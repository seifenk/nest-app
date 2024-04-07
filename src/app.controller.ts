import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

import { LocalAuthGuard } from './guard/local.guard';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './guard/roles.decorator';
import { Public } from './guard/public.decorator';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Roles()
  @UseGuards(RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
