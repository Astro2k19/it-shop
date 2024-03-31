import type { RequestHandler, Request } from 'express';
import { ParamsDictionary } from '../../types/global';

type AsyncHandler = <T = Request, K = unknown, P = ParamsDictionary>(
    middlewareFunction: RequestHandler<P, K, T>
) => RequestHandler<P, K, T>;

const catchAsyncErrors: AsyncHandler =
    (middlewareFunction) => (req, res, next) =>
        Promise.resolve(middlewareFunction(req, res, next)).catch(next);

export default catchAsyncErrors;
