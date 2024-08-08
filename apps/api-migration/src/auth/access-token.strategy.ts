import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/app/env.validation';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
    constructor(
        private prismaService: PrismaService,
        configService: ConfigService<EnvironmentVariables>
    ) {
        super({
            secretOrKey: configService.get('SECRET_ACCESS_TOKEN'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: Pick<Prisma.UserCreateInput, 'id'>) {
        const { password: _password, ...user } =
            await this.prismaService.user.findUnique({
                where: {
                    id: payload.id,
                },
            });
        return user;
    }
}
