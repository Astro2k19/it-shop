import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export const extendedPrismaClient = new PrismaClient().$extends({
    model: {
        user: {
            $allOperations({ operation, args, query }) {
                if (operation === 'create' || operation === 'update') {
                    args.data = {
                        ...args.data,
                        password: bcrypt.hash(args.data.password, 10),
                    };
                }
                return query(args);
            },
        },
    },
});

export type ExtendedPrismaClient = typeof extendedPrismaClient;
