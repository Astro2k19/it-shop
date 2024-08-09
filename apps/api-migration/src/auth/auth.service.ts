import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from '@it-shop/dtos';
import { TokenService } from '@/token/token.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private tokenService: TokenService
    ) {}

    async login(loginUserDto: LoginUserDto) {
        const user = await this.usersService.findOneByEmail(loginUserDto.email);
        if (
            !user ||
            !(await bcrypt.compare(loginUserDto.password, user.password))
        ) {
            throw new BadRequestException('Invalid email or password');
        }

        const tokens = await this.tokenService.getTokens({ id: user.id });
        await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async register(createUserDto: CreateUserDto) {
        const existingUser = await this.usersService.findOneByEmail(
            createUserDto.email
        );
        if (existingUser) {
            throw new BadRequestException('Email is already taken');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const { id } = await this.usersService.create({
            ...createUserDto,
            password: hashedPassword,
        });
        const tokens = await this.tokenService.getTokens({ id });
        await this.tokenService.saveRefreshToken(id, tokens.refreshToken);
        return tokens;
    }

    async logout(user: Omit<Prisma.UserCreateInput, 'password'>) {
        return this.tokenService.removeRefreshToken(user.id);
    }

    //TODO: hashing for refresh token
    async refreshToken(user: Omit<Prisma.UserCreateInput, 'password'>) {
        const { accessToken } = await this.tokenService.getTokens({
            id: user.id,
        });
        return { accessToken };
    }
}
