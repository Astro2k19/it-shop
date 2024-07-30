import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    register(@Body() user) {
        return this.authService.register(user);
    }
}
