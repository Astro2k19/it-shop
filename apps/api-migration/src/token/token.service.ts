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
    saveRefreshToken(userId: string, refreshToken: string) {
        return this.prismaService.token.upsert({
            create: {
                userId,
                refreshToken,
            },
            update: {
                refreshToken,
            },
            where: {
                userId,
            },
        });
    }

    removeRefreshToken(userId: string) {
        return this.prismaService.token.delete({
            where: {
                userId,
            },
        });
    }

    async getTokens(payload: Pick<Prisma.UserCreateInput, 'id'>) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('SECRET_ACCESS_TOKEN'),
                expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRE'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('SECRET_REFRESH_TOKEN'),
                expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRE'),
            }),
        ]);
        return { accessToken, refreshToken };
    }
}
