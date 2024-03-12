import {UserRoles} from "@it-shop/types";
import {RequestHandler} from "express";
import ErrorHandler from "../../shared/utils/ErrorHandler";

export default (roles: UserRoles[]): RequestHandler => {
  return (req, res, next) => {
    const isRouteAllowed = roles.some(role => req.user.roles.includes(role))

    if (!isRouteAllowed) {
      return next(
        new ErrorHandler('Access to the resource is denied, it seems that you do not have sufficient access rights', 403)
      )
    }

    next()
  }
}
