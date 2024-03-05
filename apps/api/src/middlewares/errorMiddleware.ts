import type {Request, Response, NextFunction} from "express";
import {Error} from 'mongoose'
import type {ApiErrorModel} from "@it-shop/types"
import { MongoError } from 'mongodb';
import ErrorHandler from "../utils/ErrorHandler";

export default (err: Error | ApiErrorModel | MongoError, req: Request, res: Response, next: NextFunction) => {
    let error = {
        message: err.message || 'Internal Server Error',
        statusCode: 'statusCode' in err ? err.statusCode : 500,
    }

    if (err instanceof Error.CastError) {
        error = new ErrorHandler(
            `Resource not found. Invalid: ${err.path}`,
            404
        )
    }

    if (err instanceof Error.ValidationError) {
        const errors = Object.values(err.errors).map(errValue => errValue.message).join(', ')
        error = new ErrorHandler(
            errors,
            400
        )
    }

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        return res.status(error.statusCode).json({
            message: error.message,
            error: err,
            stack: err.stack,
        })
    }

    return res.status(error.statusCode).json({
        message: error.message
    })
}
