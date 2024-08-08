import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './access-token.strategy';
import { AccessTokenGuard } from './access-token-guard';
import { RolesGuard } from './roles.guard';
import { RefreshTokenStrategy } from './refresh-token.strategy';
import { RefreshTokenGuard } from './refresh-token-guard';
import { TokenModule } from '../token/token.module';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({ global: true }),
        TokenModule,
    ],
    exports: [AuthService],
    providers: [
        AuthService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        AccessTokenGuard,
        RefreshTokenGuard,
        RolesGuard,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
