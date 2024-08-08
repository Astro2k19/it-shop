import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import configuration from '@/config/configuration';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { TokenModule } from '@/token/token.module';
import { ProductsModule } from '@/products/products.module';
import { validate } from '@/app/env.validation';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validate,
        }),
        PrismaModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        UsersModule,
        ProductsModule,
        TokenModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
