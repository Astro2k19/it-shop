import { Prisma } from '@prisma/client';

declare module 'express' {
    interface Request {
        user?: Omit<Prisma.UserCreateInput, 'password'>;
    }
}
