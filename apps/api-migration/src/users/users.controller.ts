import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ForgotPasswordDto,
    ResetPasswordDto,
    UpdateUserDto,
    UpdatePasswordDto,
    UpdateUserProfileDto,
} from '@it-shop/dtos';
import { UsersService } from './users.service';
import { Request } from 'express';
import { RolesGuard } from '@/auth/roles.guard';
import { AccessTokenGuard } from '@/auth/access-token-guard';
import { Roles } from '@/auth/roles.decorator';
import { UserRoles } from '@/auth/roles.enum';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('me/password/forgot')
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.usersService.forgotPassword(forgotPasswordDto.email);
    }

    @Put('me/password/reset/:token')
    resetPassword(
        @Body() resetPasswordDto: ResetPasswordDto,
        @Param(':token') token: string
    ) {
        return this.usersService.resetPassword(resetPasswordDto, token);
    }

    @UseGuards(AccessTokenGuard)
    @Put('me/password/update')
    updatePassword(
        @Body() updatePasswordDto: UpdatePasswordDto,
        @Req() req: Request
    ) {
        return this.usersService.updatePassword(updatePasswordDto, req.user.id);
    }

    @UseGuards(AccessTokenGuard)
    @Put('me')
    updateMe(
        @Body() updateUserProfileDto: UpdateUserProfileDto,
        @Req() req: Request
    ) {
        return this.usersService.updateMe(updateUserProfileDto, req.user);
    }

    @UseGuards(AccessTokenGuard)
    @Get('me')
    getMe(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(RolesGuard)
    @UseGuards(AccessTokenGuard)
    @Roles(UserRoles.Admin)
    @Get(':id')
    findById(@Param(':id') userId: string) {
        return this.usersService.findById(userId);
    }

    @UseGuards(RolesGuard)
    @UseGuards(AccessTokenGuard)
    @Roles(UserRoles.Admin)
    @Put(':id')
    updateById(@Body() updateUserDto: UpdateUserDto, @Param(':id') id: string) {
        return this.usersService.update({ id }, updateUserDto);
    }

    @UseGuards(RolesGuard)
    @UseGuards(AccessTokenGuard)
    @Roles(UserRoles.Admin)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(RolesGuard)
    @UseGuards(AccessTokenGuard)
    @Roles(UserRoles.Admin)
    @Delete(':id')
    deleteById(@Param(':id') userId: string) {
        return this.usersService.deleteById(userId);
    }
}
