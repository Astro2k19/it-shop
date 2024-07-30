import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findOne(email);
        if (!user) {
            throw new BadRequestException('Invalid email & password');
        }
        const isMatch = bcrypt.compareSync(user.password, pass);
        if (!isMatch) {
            throw new BadRequestException('Invalid email & password');
        }
        const { password, ...result } = user;
        return result;
    }

    login(user: any) {
        const payload = { sub: user.userId, email: user.email };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async register(user: any) {
        const existingUser = await this.usersService.findOne(user.email);
        if (existingUser) {
            throw new BadRequestException('Email is already taken');
        }
        const hashedPassword = bcrypt.hash(user.password, 10);
        const newUser = await this.usersService.create({
            ...user,
            hashedPassword,
        });
        return this.login(newUser);
    }
}
