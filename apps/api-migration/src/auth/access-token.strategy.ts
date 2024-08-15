import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Prisma } from '@prisma/client';
import { CustomPrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/app/env.validation';
import { ExtendedPrismaClient } from '@/prisma/prisma.extension';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
    constructor(
        private prismaService: CustomPrismaService<ExtendedPrismaClient>,
        configService: ConfigService<EnvironmentVariables>
    ) {
        super({
            secretOrKey: configService.get('SECRET_ACCESS_TOKEN'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: Pick<Prisma.UserCreateInput, 'id'>) {
        console.log('access payload', payload);
        const { password: _password, ...user } =
            await this.prismaService.client.user.findUnique({
                where: {
                    id: payload.id,
                },
            });
        return user;
    }
}
