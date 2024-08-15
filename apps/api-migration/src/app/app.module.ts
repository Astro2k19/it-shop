import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomPrismaModule } from 'nestjs-prisma';
import configuration from '@/config/configuration';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { TokenModule } from '@/token/token.module';
import { ProductsModule } from '@/products/products.module';
import { validate } from '@/app/env.validation';
import { MailModule } from '@/mail/mail.module';
import { extendedPrismaClient } from '@/prisma/prisma.extension';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validate,
        }),
        CustomPrismaModule.forRootAsync({
            name: 'PrismaService',
            isGlobal: true,
            useFactory: () => {
                return extendedPrismaClient;
            },
        }),
        AuthModule,
        UsersModule,
        ProductsModule,
        TokenModule,
        MailModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
