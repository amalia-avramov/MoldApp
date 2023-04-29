import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass) {
    const user = await this.userService.findUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    return {
      access_token: await this.jwtService.signAsync({ email }),
    };
  }
}