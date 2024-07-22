import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {PrismaService} from "nestjs-prisma";

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService) {}
    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    findAll() {
        return `This action returns all users`;
    }

  private readonly users = [
    {
      userId: 1,
      email: 'test@example.com',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'lol@example.com',
      password: 'guess',
    },
  ];

  async findOne(email: string) {
    return this.users.find(user => user.email === email);
  }


  update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
