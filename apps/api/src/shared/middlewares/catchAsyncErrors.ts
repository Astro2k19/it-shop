import type {RequestHandler, Request} from "express";
import * as core from "express-serve-static-core";

type AsyncHandler = <T = Request, K = unknown, P = core.ParamsDictionary>(middlewareFunction: RequestHandler<P, K, T>) => RequestHandler<P, K, T>

const catchAsyncErrors: AsyncHandler = (middlewareFunction) =>
  (req, res, next) =>
    Promise.resolve(middlewareFunction(req, res, next)).catch(next)

export default catchAsyncErrors
