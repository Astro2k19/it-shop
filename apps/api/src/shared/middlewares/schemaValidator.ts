import { RequestHandler } from 'express';
import authSchema from '../validators/auth/validator';
import orderSchema from '../validators/order/validator';
import reviewSchema from '../validators/review/validator';
import productSchema from '../validators/product/validator';
import { Schema } from 'joi';
import ErrorHandler from '../../shared/utils/ErrorHandler';

const supportedMethods = ['get', 'post', 'put', 'patch', 'delete'];

const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
};

const schemaValidator = (
    path: string,
    requestField = 'body'
): RequestHandler => {
    const schema: Schema = {
        ...authSchema,
        ...orderSchema,
        ...reviewSchema,
        ...productSchema,
    }[path];
    if (!schema) {
        throw new ErrorHandler(`Schema not found for path: ${path}`, 500);
    }

    return (req, res, next) => {
        const method = req.method.toLowerCase();

        if (!supportedMethods.includes(method)) {
            return next();
        }

        const { error, value } = schema.validate(
            req[requestField],
            validationOptions
        );

        if (error) {
            return next(error);
        }

        req.body = value;
        return next();
    };
};

export default schemaValidator;
