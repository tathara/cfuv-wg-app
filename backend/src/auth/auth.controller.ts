import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':username')
  async isUser(@Param('username') username: string): Promise<boolean> {
    return this.authService.isUser(username);
  }

  @Get(':username/code')
  async getCodeForUser(@Param('username') username: string): Promise<string> {
    return this.authService.getCodeForUser(username);
  }
}
