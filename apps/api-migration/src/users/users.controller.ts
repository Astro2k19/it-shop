import { Body, Controller, Param } from '@nestjs/common';
import { ForgotPasswordDto } from '@it-shop/dtos';
import { UsersService } from './users.service';
import { ResetPasswordDto } from '../../../../libs/src/dtos/user/reset-password.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.usersService.forgotPassword(forgotPasswordDto.email);
    }
    resetPassword(
        @Body() resetPasswordDto: ResetPasswordDto,
        @Param('token') token: string
    ) {
        return this.usersService.resetPassword(resetPasswordDto, token);
    }

    updatePassword() {}
    getProfile() {}
    updateProfile() {}
    getDetails() {}
    updateDetails() {}
    findAllUsers() {}
    delete() {}
}
