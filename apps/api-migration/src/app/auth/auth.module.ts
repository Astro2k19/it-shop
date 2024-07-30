import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstanse } from './constanse';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstanse.secret,
            signOptions: {
                expiresIn: '60s',
            },
        }),
    ],
    exports: [AuthService],
    providers: [
        AuthService,
        LocalStrategy,
        LocalAuthGuard,
        JwtStrategy,
        JwtAuthGuard,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
