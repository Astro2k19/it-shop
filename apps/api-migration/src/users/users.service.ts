import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto, UpdateUserDto } from '@it-shop/dtos';
import { MailService } from '@/mail/main.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        mailService: MailService
    ) {}
    create(createUserDto: CreateUserDto) {
        return this.prismaService.user.create({
            data: {
                ...createUserDto,
                roles: ['Admin'],
            },
        });
    }

    async findOneByEmail(email: string) {
        return this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.prismaService.user.update({
            where: {
                id: id.toString(),
            },
            data: updateUserDto,
        });
    }

    forgotPassword(email: string) {}
}
