import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '@it-shop/dtos';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req) {
        const user: Omit<Prisma.UserCreateInput, 'password'> = req.user;
        return this.authService.login(user);
    }

    @Post('register')
    register(@Body() user: CreateUserDto) {
        return this.authService.register(user);
    }
}
