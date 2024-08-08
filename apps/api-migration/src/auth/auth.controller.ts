import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '@it-shop/dtos';
import { Response } from 'express';
import { RefreshTokenGuard } from './refresh-token-guard';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService
    ) {}

    @Post('login')
    async login(
        @Body() loginUserDto: LoginUserDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const tokens = await this.authService.login(loginUserDto);
        res.cookie(
            'refreshToken',
            tokens.refreshToken,
            this.configService.get<CookieOptions>('cookieOptions')
        );
        return {
            accessToken: tokens.accessToken,
        };
    }

    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const tokens = await this.authService.register(createUserDto);
        res.cookie(
            'refreshToken',
            tokens.refreshToken,
            this.configService.get<CookieOptions>('cookieOptions')
        );
        return {
            accessToken: tokens.accessToken,
        };
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    async refreshToken(userId: string) {
        return this.authService.refreshToken(userId);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('logout')
    async logout(userId: string, @Res({ passthrough: true }) res: Response) {
        res.clearCookie(
            'refreshToken',
            this.configService.get<CookieOptions>('cookieOptions')
        );
        return this.authService.logout(userId);
    }
}
