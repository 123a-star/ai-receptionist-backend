import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Ye API endpoint banayega: POST http://localhost:3000/auth/login
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }
}