import type {Request, Response, NextFunction} from "express";
import {Error as MongooseError} from 'mongoose'
import type {ApiErrorModel} from "@it-shop/types"
import { MongoServerError } from 'mongodb';
import Joi from 'joi'
import ErrorHandler from "../../shared/utils/ErrorHandler";
import {JsonWebTokenError, NotBeforeError, TokenExpiredError} from 'jwt-redis'

type VerifyErrors = JsonWebTokenError | TokenExpiredError | NotBeforeError
type MiddlewareError = MongooseError | ApiErrorModel | MongoServerError | Joi.ValidationError | VerifyErrors

enum MongoServerErrorList {
  DuplicateKey = 11000
}

export default (err: MiddlewareError, req: Request, res: Response, next: NextFunction) => {
    let error = new ErrorHandler(
      err.message || 'Internal Server Error',
      'statusCode' in err ? err.statusCode : 500
    )

    if (err instanceof MongooseError.CastError) {
        error = new ErrorHandler(
            `Resource not found. Invalid: ${err.path}`,
            404
        )
    }

    if (err instanceof MongooseError.ValidationError) {
        const errors = Object.values(err.errors).map(errValue => errValue.message).join(', ')
        error = new ErrorHandler(
            errors,
            400
        )
    }

    if (err instanceof Joi.ValidationError) {
      const errors = err.details.map(({ message }) => message.replace(/['"]/g, '')).join(', ')
      error = new ErrorHandler(
        errors,
        422
      )
    }

  if ('code' in err && err.code === MongoServerErrorList.DuplicateKey) {
    const [duplicatedField] = Object.keys(err.keyValue)
    error = new ErrorHandler(
      `Duplicate ${duplicatedField} entered`,
      400
    )
  }


  if (err instanceof TokenExpiredError) {
    const message = `JSON Web Token is expired. Try again!`
    error = new ErrorHandler(
      message,
      400
    )
  }

  if (err instanceof JsonWebTokenError) {
    const message = 'JSON Web Token is invalid. Try again!'
    error = new ErrorHandler(
      message,
      400
    )
  }

    if (process.env.NODE_ENV === 'development') {
        return res.status(error.statusCode).json({
            message: error.message,
            error: error,
            stack: error.stack,
        })
    }

    return res.status(error.statusCode).json({
        message: error.message
    })
}
