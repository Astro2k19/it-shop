import type { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import type { ApiError } from '@it-shop/types';
import { MongoServerError } from 'mongodb';
import ErrorHandler from '../../shared/utils/ErrorHandler';
import {
    JsonWebTokenError,
    NotBeforeError,
    TokenExpiredError,
    TokenDestroyedError,
} from 'jwt-redis';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

type VerifyErrors =
    | JsonWebTokenError
    | TokenExpiredError
    | NotBeforeError
    | TokenDestroyedError;
type MiddlewareError =
    | MongooseError
    | ApiError
    | MongoServerError
    | ZodError
    | VerifyErrors;

enum MongoServerErrorList {
    DuplicateKey = 11000,
}

export default (
    err: MiddlewareError,
    req: Request,
    res: Response,
    _: NextFunction
) => {
    let error = new ErrorHandler(
        err.message || 'Internal Server Error',
        'statusCode' in err ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
    );

    console.log(err, 'err');

    if (err instanceof MongooseError.CastError) {
        error = new ErrorHandler(
            `Resource not found. Invalid: ${err.path}`,
            StatusCodes.NOT_FOUND
        );
    }

    if (err instanceof MongooseError.ValidationError) {
        const errors = Object.values(err.errors)
            .map((errValue) => errValue.message)
            .join(', ');
        error = new ErrorHandler(errors, StatusCodes.BAD_REQUEST);
    }

    if (err instanceof ZodError) {
        const errors = err.errors
            .map(
                (issue) =>
                    `${issue.path.join('.')} is ${issue.message.toLowerCase()}`
            )
            .join(', ');
        error = new ErrorHandler(errors, StatusCodes.BAD_REQUEST);
    }

    if ('code' in err && err.code === MongoServerErrorList.DuplicateKey) {
        const [duplicatedField] = Object.keys(err.keyValue);
        error = new ErrorHandler(
            `Duplicate ${duplicatedField} entered`,
            StatusCodes.BAD_REQUEST
        );
    }

    if (err instanceof TokenExpiredError) {
        const message = `JSON Web Token is expired. Try again!`;
        error = new ErrorHandler(message, StatusCodes.UNAUTHORIZED);
    }

    if (
        err instanceof JsonWebTokenError ||
        err instanceof TokenDestroyedError
    ) {
        const message = 'JSON Web Token is invalid. Try again!';
        error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }

    if (process.env.NODE_ENV === 'development') {
        return res.status(error.statusCode).json({
            message: error.message,
            error: error,
            stack: error.stack,
        });
    }

    return res.status(error.statusCode).json({
        message: error.message,
    });
};
