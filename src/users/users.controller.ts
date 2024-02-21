import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('hello') //this is private route
  getHello(@Req() req): string {
    console.log('req user ==> ', req.user);
    return 'hello 123';
  }
}
