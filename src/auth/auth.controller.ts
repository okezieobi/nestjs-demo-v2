import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUser } from './dto/login.input';
import { SignupUser } from './dto/signup.input';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUser) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signup(@Body() signupDto: SignupUser) {
    return this.authService.signup(signupDto);
  }
}
