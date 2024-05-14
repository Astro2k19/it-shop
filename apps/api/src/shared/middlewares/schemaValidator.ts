import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodRawShape, ZodTypeAny } from 'zod';

import { StatusCodes } from 'http-status-codes';
import ErrorHandler from '../utils/ErrorHandler';

export function validateData<T extends ZodRawShape, K extends ZodTypeAny>(
    schema: z.ZodObject<T, any> | z.ZodEffects<K>,
    field = 'body'
) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req[field]);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                next(error);
            } else {
                next(
                    new ErrorHandler(
                        'Internal Server Error',
                        StatusCodes.INTERNAL_SERVER_ERROR
                    )
                );
            }
        }
    };
}
