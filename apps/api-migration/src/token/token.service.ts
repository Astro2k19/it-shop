import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { EnvironmentVariables } from '@/app/env.validation';

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService<EnvironmentVariables>,
        private prismaService: PrismaService
    ) {}

    async saveRefreshToken(userId: string, refreshToken: string) {
        return this.prismaService.token.upsert({
            create: { userId, refreshToken },
            update: { refreshToken },
            where: { userId },
        });
    }

    async removeRefreshToken(userId: string) {
        return this.prismaService.token.delete({
            where: { userId },
        });
    }

    async getTokens(payload: Pick<Prisma.UserCreateInput, 'id'>) {
        const accessToken = await this.createToken(
            payload,
            'SECRET_ACCESS_TOKEN',
            'ACCESS_TOKEN_EXPIRE'
        );
        const refreshToken = await this.createToken(
            payload,
            'SECRET_REFRESH_TOKEN',
            'REFRESH_TOKEN_EXPIRE'
        );

        return { accessToken, refreshToken };
    }

    private createToken(
        payload: Record<any, unknown>,
        secretKey: keyof EnvironmentVariables,
        expireTime: keyof EnvironmentVariables
    ) {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get(secretKey),
            expiresIn: this.configService.get(expireTime),
        });
    }
}
