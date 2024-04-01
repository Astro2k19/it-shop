import type { RequestHandler, Request } from 'express';
import { ParamsDictionary, ParsedQs } from '../../types/global';

type AsyncHandler = <
    T = Request,
    K = unknown,
    P = ParamsDictionary,
    Q = ParsedQs
>(
    middlewareFunction: RequestHandler<P, K, T, Q>
) => RequestHandler<P, K, T, Q>;

const catchAsyncErrors: AsyncHandler =
    (middlewareFunction) => (req, res, next) =>
        Promise.resolve(middlewareFunction(req, res, next)).catch(next);

export default catchAsyncErrors;
