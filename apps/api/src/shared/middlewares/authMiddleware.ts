import catchAsyncErrors from './catchAsyncErrors';
import { JwtPayload } from 'jsonwebtoken';
import User from '../../model/User';
import { jwtTokenService } from '../../controllers/authController';
import { ApiError } from '@it-shop/schemas';

export default catchAsyncErrors(async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(new ApiError('Login first to access this resource', 401));
    }

    const bearerToken = req.headers.authorization.split(' ')[1];
    if (!bearerToken) {
        return next(new ApiError('Login first to access this resource', 401));
    }

    const decoded = jwtTokenService.verifyAccessToken(
        bearerToken
    ) as JwtPayload;
    if (!decoded) {
        return next(new ApiError('Login first to access this resource', 401));
    }

    req.user = await User.findById(decoded.id);
    next();
});
