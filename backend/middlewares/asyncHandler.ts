import type {NextFunction, Request, Response} from "express";
import type {RequestHandler} from "express";

export default (middlewareFunction: RequestHandler): RequestHandler => (req: Request, res: Response, next: NextFunction) => Promise.resolve(middlewareFunction(req, res, next)).catch(next)