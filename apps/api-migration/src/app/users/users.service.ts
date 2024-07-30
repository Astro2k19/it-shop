import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}
    create(createUserDto: CreateUserDto) {
        return this.prismaService.user.create({
            data: createUserDto,
        });
    }

    async findOne(email: string) {
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
