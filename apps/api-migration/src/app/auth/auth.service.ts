import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from '@it-shop/dtos';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new BadRequestException('Invalid email & password');
        }
        const isMatch = bcrypt.compareSync(user.password, pass);
        if (!isMatch) {
            throw new BadRequestException('Invalid email & password');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
    }

    login(user: Omit<Prisma.UserCreateInput, 'password'>) {
        const payload = { id: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async register(user: CreateUserDto) {
        const existingUser = await this.usersService.findOneByEmail(user.email);
        if (existingUser) {
            throw new BadRequestException('Email is already taken');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.usersService.create({
            ...user,
            password: hashedPassword,
        });
        return this.login(newUser);
    }
}
