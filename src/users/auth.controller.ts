import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from 'src/login/dto/create-login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  verifyAccount(@Body() createLoginDto: CreateLoginDto) {
    return this.authService.login(createLoginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
}
