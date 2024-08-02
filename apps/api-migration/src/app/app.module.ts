import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule.forRootAsync({
            isGlobal: true,
            useFactory: async (configService: ConfigService) => {
                return {
                    prismaOptions: {
                        datasources: {
                            db: {
                                url: configService.get('DATABASE_URL'),
                            },
                        },
                    },
                };
            },
            inject: [ConfigService],
        }),
        AuthModule,
        UsersModule,
        ProductsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
