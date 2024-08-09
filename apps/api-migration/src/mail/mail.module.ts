import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/app/env.validation';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './main.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigModule],
            useFactory: (
                configService: ConfigService<EnvironmentVariables>
            ) => ({
                transport: {
                    host: configService.get('SMTP_HOST'),
                    port: configService.get('SMTP_PORT'),
                    secure: false,
                    auth: {
                        user: configService.get('SMTP_EMAIL'),
                        pass: configService.get('SMTP_PASS'),
                    },
                },
                defaults: {
                    from: `"${configService.get(
                        'SMTP_FROM_NAME'
                    )}" <${configService.get('SMTP_FROM_EMAIL')}>`,
                },
                preview: true,
                template: {
                    dir: process.cwd() + '/templates/',
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
