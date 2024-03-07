import { RequestHandler } from "express";
import schemas from "../validators/auth.validator";
import {Schema} from "joi";
import ErrorHandler from "../../utils/ErrorHandler";

const supportedMethods = ["post", "put", "patch", "delete"];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const schemaValidator = (path: string): RequestHandler => {
  const schema: Schema = schemas[path];

  if (!schema) {
    throw new ErrorHandler(`Schema not found for path: ${path}`, 500);
  }

  return (req, res, next) => {
    const method = req.method.toLowerCase();

    if (!supportedMethods.includes(method)) {
      return next();
    }

    const { error, value } = schema.validate(req.body, validationOptions);

    if (error) {
      return next(error);
    }

    req.body = value;
    return next();
  };
};

export default schemaValidator;

