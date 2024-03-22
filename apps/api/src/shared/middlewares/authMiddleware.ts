import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../../shared/utils/ErrorHandler";
import {JwtPayload} from 'jsonwebtoken'
import User from "../../model/User";
import TokenService from "../../services/TokenService";

export default catchAsyncErrors(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(
      new ErrorHandler('Login first to access this resource', 401)
    )
  }

  const bearerToken = req.headers.authorization.split(' ')[1]
  if (!bearerToken) {
    return next(
      new ErrorHandler('Login first to access this resource', 401)
    )
  }

  const tokenService = await TokenService.getInstance()
  const decoded = await tokenService.verifyAccessToken(bearerToken) as JwtPayload
  const user = await User.findById(decoded.id)

  req.user = user
  next()
})
