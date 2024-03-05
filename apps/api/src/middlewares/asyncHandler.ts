import type {RequestHandler} from "express";


type AsyncHandler = (middlewareFunction: RequestHandler) => RequestHandler

const asyncHandler: AsyncHandler = (middlewareFunction) => (req, res, next) => Promise.resolve(middlewareFunction(req, res, next)).catch(next)

export default asyncHandler
