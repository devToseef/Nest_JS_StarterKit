import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async validateUser(email): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(email, password) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const checkPass = await this.comparePassword(user.password, password);
    if (!checkPass) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    const token = this.jwtService.sign(user.email);
    delete user['password'];
    return { user, token };
  }

  async comparePassword(userPassword, enteredPassword) {
    return await bcrypt.compare(enteredPassword, userPassword);
  }
}
