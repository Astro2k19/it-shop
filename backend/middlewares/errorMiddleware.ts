import type {Request, Response, NextFunction} from "express";
import type {ApiError} from "../types/ApiError";

export default (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const error = {
        message: err.message || 'Internal Server Error',
        statusCode: err.statusCode || 500,
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