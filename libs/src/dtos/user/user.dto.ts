import { Role } from '@prisma/client';

export class UserDto {
    id: string;
    email: string;
    name: string;
    password: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
}
