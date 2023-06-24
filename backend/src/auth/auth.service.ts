import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // ----------------------------------------------------------
  // Authentification function
  // ----------------------------------------------------------
  async signIn(email: string, pass: string) {
    const user = await this.userService.findUserByEmail(email);
    // Verify user password
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    return {
      user: user,
      access_token: await this.jwtService.signAsync({ email }),
    };
  }
}
