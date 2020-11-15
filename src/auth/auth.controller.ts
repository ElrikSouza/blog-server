import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { SignUpDto } from './sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body(ValidationPipe) { email, password }: LoginDto) {
    const user = await this.authService.getUserIfCredentialsMatch(
      email,
      password,
    );

    const token = await this.authService.login(user);

    return token;
  }

  @Post('/sign_up')
  async signUp(
    @Body(new ValidationPipe({ whitelist: true }))
    signUpDto: SignUpDto,
  ) {
    await this.authService.registerUser(signUpDto);

    return { message: 'User has been created' };
  }
}
