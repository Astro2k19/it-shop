import catchAsyncErrors from './catchAsyncErrors';
import ErrorHandler from '../../shared/utils/ErrorHandler';
import { JwtPayload } from 'jsonwebtoken';
import User from '../../model/User';
import { tokenService } from '../../controllers/authController';

export default catchAsyncErrors(async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(
            new ErrorHandler('Login first to access this resource', 401)
        );
    }

    const bearerToken = req.headers.authorization.split(' ')[1];
    if (!bearerToken) {
        return next(
            new ErrorHandler('Login first to access this resource', 401)
        );
    }

    const decoded = (await tokenService.verifyAccessToken(
        bearerToken
    )) as JwtPayload;
    req.user = await User.findById(decoded.id);
    next();
});
