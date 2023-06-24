import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ----------------------------------------------------------
  // Authentification endpoint
  // ----------------------------------------------------------
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() user: Record<string, any>) {
    return this.authService.signIn(user.email, user.password);
  }
}
