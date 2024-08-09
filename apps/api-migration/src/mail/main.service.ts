import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendResetPassword(user, token: string) {
        const url = `example.com/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './reset-password',
            context: {
                name: user.name,
                url,
            },
        });
    }
}
