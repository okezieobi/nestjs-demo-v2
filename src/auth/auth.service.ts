import {
  Injectable,
  UnauthorizedException,
  NotAcceptableException,
} from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { bcryptConstants } from './constants';
import { LoginUser } from './dto/login.input';
import { SignupUser } from './dto/signup.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: LoginUser) {
    const user = await this.usersService.user({ email }, { roles: true });
    if (user == null || compareSync(password, user.hasedPassword) == false) {
      throw new UnauthorizedException();
    }
    const roles = [];
    user.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        roles.push(`${role.name}:${permission}`);
      });
    });
    const payload = {
      id: user.id,
      roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        roles: user.roles,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
    };
  }

  async signup({ email, password, firstName, lastName }: SignupUser) {
    const exists = await this.usersService.user({ email }, { roles: true });
    if (exists) {
      throw new NotAcceptableException();
    }
    const user = await this.usersService.createUser({
      email,
      firstName,
      lastName,
      hasedPassword: hashSync(
        password,
        genSaltSync(bcryptConstants.saltRounds),
      ),
    });
    const payload = {
      id: user.id,
      roles: [],
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        ...payload,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
    };
  }
}
