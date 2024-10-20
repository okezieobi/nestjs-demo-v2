import {
  Injectable,
  UnauthorizedException,
  NotAcceptableException,
} from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { bcryptConstants } from './constants';
import { LoginUserDto } from './logim.dto';
import { SignupUserDto } from './signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: LoginUserDto) {
    const user = await this.usersService.user({ email });
    if (user == null || compareSync(password, user.hasedPassword)) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }

  async signup({ email, password, firstName, lastName}: SignupUserDto) {
    const user = await this.usersService.user({ email });
    if (user) {
      throw new NotAcceptableException();
    }
    const newUser = await this.usersService.createUser({
      email,
      firstName,
      lastName,
      hasedPassword: hashSync(
        password,
        genSaltSync(bcryptConstants.saltRounds),
      ),
    });
    const payload = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      createdAt: newUser.createdAt,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }
}
