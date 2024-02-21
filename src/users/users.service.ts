import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { USER_ROLE } from 'common/helpers';
import { ICreateAccount } from 'common/helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    role: string,
  ): Promise<ICreateAccount> {
    const findUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (findUser) {
      throw new HttpException('User already exsits', HttpStatus.BAD_REQUEST);
    }
    const user: User = new User();
    user.email = email;
    user.role = role.toUpperCase() as USER_ROLE;
    user.password = password;

    await this.userRepository.save(user);
    const token = this.jwtService.sign(user.email);
    delete user['password'];
    return { user, token };
  }

  async findByEmail(email) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
