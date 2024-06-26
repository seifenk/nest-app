import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/stuApp/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneBy({ username, password });
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else return null;
  }

  async token(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
