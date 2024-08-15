import {
  BadRequestException, Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import {
    CreateUserDto,
    ResetPasswordDto,
    UpdatePasswordDto,
    UpdateUserDto,
    UpdateUserProfileDto,
} from '@it-shop/dtos';
import { MailService } from '@/mail/main.service';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { ResetTokenService } from '@/token/reset-token.service';
import { ExtendedPrismaClient } from '@/prisma/prisma.extension';

@Injectable()
export class UsersService {
    constructor(
      @Inject('PrismaService')
        private prismaService: CustomPrismaService<ExtendedPrismaClient>,
        private mailService: MailService,
        private resetTokenService: ResetTokenService
    ) {}
    create(createUserDto: CreateUserDto) {
        return this.prismaService.client.user.create({
            data: {
                ...createUserDto,
            },
        });
    }

    findOneByEmail(email: string) {
        return this.prismaService.client.user.findUnique({
            where: {
                email,
            },
        });
    }
    findById(id: string) {
        return this.prismaService.client.user.findUnique({
            where: {
                id,
            },
        });
    }

    findAll() {
        return this.prismaService.client.user.findMany();
    }

    deleteById(id: string) {
        return this.prismaService.client.user.delete({
            where: {
                id,
            },
        });
    }

    update(where: Prisma.UserWhereUniqueInput, updateUserDto: UpdateUserDto) {
        return this.prismaService.client.user.update({
            where,
            data: updateUserDto,
        });
    }

    updateMe(
        updateUserProfileDto: UpdateUserProfileDto,
        user: Omit<Prisma.UserCreateInput, 'password'>
    ) {
        return this.prismaService.client.user.update({
            where: {
                id: user.id,
            },
            data: updateUserProfileDto,
        });
    }

    async forgotPassword(email: string) {
        const user = await this.findOneByEmail(email);
        if (!user) {
            throw new NotFoundException("User with such email doesn't exist");
        }
        const resetToken = this.resetTokenService.generate();
        const hashedResetToken = this.resetTokenService.hash(resetToken);
        const resetPasswordExpire =
            this.resetTokenService.generateExpiry('15m');
        const message = await this.mailService.sendResetPassword(
            user,
            resetToken
        );
        await this.update(
            { email },
            {
                resetPasswordToken: hashedResetToken,
                resetPasswordExpire,
            }
        );
        return message;
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto, token: string) {
        const hashedResetPasswordToken = this.resetTokenService.hash(token);
        const user = await this.prismaService.client.user.findFirst({
            where: {
                resetPasswordToken: hashedResetPasswordToken,
                resetPasswordExpire: {
                    gte: new Date(Date.now()),
                },
            },
        });
        if (!user) {
            throw new NotFoundException(
                'Reset password token is inactive or has been expired'
            );
        }
        return this.update(
            { id: user.id },
            { password: resetPasswordDto.password }
        );
    }

    async updatePassword(updatePasswordDto: UpdatePasswordDto, id: string) {
        const user = await this.prismaService.client.user.findUnique({
            where: {
                id,
            },
        });
        const isMatchPasswords = await bcrypt.compare(
            updatePasswordDto.oldPassword,
            user.password
        );
        if (!isMatchPasswords) {
            throw new BadRequestException('Old password is invalid');
        }
        await this.update(
            {
                id,
            },
            { password: updatePasswordDto.newPassword }
        );
        return { success: true };
    }
}
