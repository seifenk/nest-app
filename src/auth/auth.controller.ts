import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { Public } from '@/shared/decorator/public.decorator';
import { LocalAuthGuard } from '@/shared/guard/local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.token(req.user);
  }
}
