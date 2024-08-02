import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto, UpdateUserDto } from '@it-shop/dtos';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}
    create(createUserDto: CreateUserDto) {
        return this.prismaService.user.create({
            data: createUserDto,
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
}
