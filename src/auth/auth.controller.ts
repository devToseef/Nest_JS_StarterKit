import { Controller, Body, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { ICreateAccount } from 'common/helpers';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Public() //for public  routes
  @Post('register')
  public async register(@Body() args): Promise<ICreateAccount> {
    const { email, password, role } = args;
    return await this.userService.register(email, password, role);
  }

  @Public() //for public routes
  @Post('login')
  public async login(@Body() args) {
    const { email, password } = args;
    return await this.authService.login(email, password);
  }
}
