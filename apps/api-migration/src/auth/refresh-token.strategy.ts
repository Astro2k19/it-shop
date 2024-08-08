import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { EnvironmentVariables } from '@/app/env.validation';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh'
) {
    constructor(
        private prismaService: PrismaService,
        configService: ConfigService<EnvironmentVariables>
    ) {
        super({
            secretOrKey: configService.get('SECRET_REFRESH_TOKEN'),
            jwtFromRequest: (req: Request) => {
                let token = null;
                if (req && req.cookies) {
                    token = req.cookies['refreshToken'];
                }
                return token;
            },
        });
    }

    async validate(payload: Pick<Prisma.UserCreateInput, 'id'>) {
        const refreshToken = await this.prismaService.token.findUnique({
            where: {
                userId: payload.id,
            },
        });
        if (!refreshToken) {
            throw new ForbiddenException('Access Denied');
        }
        return payload.id;
    }
}
