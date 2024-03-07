import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../../utils/ErrorHandler";
import jwt, {JwtPayload} from 'jsonwebtoken'
import User from "../../model/User";

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

  jwt.verify(bearerToken, process.env.SECRET_ACCESS_TOKEN, async (error, decoded: JwtPayload) => {
    if (error) {
      return next(
        new ErrorHandler('Login first to access this resource', 401)
      )
    }

    const user = await User.findById(decoded.id)
    req.user = user
    next()
  })
})
