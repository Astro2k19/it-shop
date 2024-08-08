import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from '@it-shop/dtos';
import { TokenService } from '@/token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private tokenService: TokenService
    ) {}

    async login(loginUserDto: LoginUserDto) {
        const user = await this.usersService.findOneByEmail(loginUserDto.email);
        if (!user) {
            throw new BadRequestException('Invalid email & password');
        }
        const isMatch = await bcrypt.compare(
            loginUserDto.password,
            user.password
        );
        if (!isMatch) {
            throw new BadRequestException('Invalid email & password');
        }
        const tokens = await this.tokenService.getTokens({ id: user.id });
        await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);
        console.log(tokens, 'tokens');
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
        const newUser = await this.usersService.create({
            ...createUserDto,
            password: hashedPassword,
        });
        const tokens = await this.tokenService.getTokens({ id: newUser.id });
        await this.tokenService.saveRefreshToken(
            newUser.id,
            tokens.refreshToken
        );
        return tokens;
    }

    logout(userId: string) {
        return this.tokenService.removeRefreshToken(userId);
    }

    async refreshToken(userId: string) {
        const { accessToken } = await this.tokenService.getTokens({
            id: userId,
        });
        return { accessToken };
    }
}
