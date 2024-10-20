import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async signIn(email: string, password: string) {
        const user = await this.usersService.user({ email })
        if (user == null || compareSync(password, user.hasedPassword)) {
            throw new UnauthorizedException()
        }
        const payload  = { id: user.id }
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt
            }
        }
    }
}
