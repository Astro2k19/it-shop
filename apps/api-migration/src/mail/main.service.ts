import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/app/env.validation';

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private configService: ConfigService<EnvironmentVariables>
    ) {}

    async sendResetPassword(user: Prisma.UserCreateInput, token: string) {
        const resetLink = `${this.configService.get(
            'CLIENT_URL'
        )}/api/users/me/password/reset/${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'ItShop password recovery',
            template: './reset-password',
            context: {
                username: user.name,
                resetLink,
                supportUrl: '',
            },
        });
        return { message: 'A reset link has been sent to your email address' };
    }
}
