import catchAsyncErrors from '../shared/middlewares/catchAsyncErrors';
import User from '../model/User';
import ErrorHandler from '../shared/utils/ErrorHandler';
import { getResetPasswordTemplate } from '../shared/utils/getResetPasswordTemplate';
import TokenService from '../services/TokenService';
import MailService from '../services/MailService';
import PasswordService from '../services/PasswordService';
import {
    LoginSchema,
    PasswordForgotSchema,
    PasswordResetSchema,
    PasswordUpdateSchema,
    RegisterSchema,
    UpdateUserProfileSchema,
} from '../shared/validators/auth/validatorSchemas';
import { UserModel } from '@it-shop/types';

// POST => /api/v1/register
export const registerUser = catchAsyncErrors<RegisterSchema>(
    async (req, res) => {
        const { name, email, password } = req.body;

        const { _id: userId } = await User.create({
            name,
            email,
            password,
        });

        const tokenService = await TokenService.getInstance();
        const { accessToken, refreshToken } = await tokenService.getJwtTokens(
            userId
        );
        await tokenService.saveRefreshToken(userId, refreshToken);
        tokenService.sendTokens(res, accessToken, refreshToken);
    }
);

// POST => /api/v1/login
export const loginUser = catchAsyncErrors<LoginSchema>(
    async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return next(new ErrorHandler('Invalid email & password', 401));
        }

        const isPassEqual = await user.comparePasswords(password);
        if (!isPassEqual) {
            return next(new ErrorHandler('Invalid email & password', 401));
        }

        const tokenService = await TokenService.getInstance();
        const { accessToken, refreshToken } = await tokenService.getJwtTokens(
            user._id
        );
        await tokenService.saveRefreshToken(user._id, refreshToken);
        tokenService.sendTokens(res, accessToken, refreshToken);
    }
);

// POST => /api/v1/logout

export const logoutUser = catchAsyncErrors(async (req, res) => {
    const { refreshToken } = req.cookies;

    const tokenService = await TokenService.getInstance();
    await tokenService.clearRefreshToken(res, refreshToken);
    res.status(200).json({
        message: 'logout',
    });
});

// POST => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors<PasswordForgotSchema>(
    async (req, res, next) => {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return next(
                new ErrorHandler('Not found user with such email', 404)
            );
        }

        const { resetToken, hashedRestToken, resetPasswordExpire } =
            PasswordService.getResetPasswordToken();

        user.resetPasswordToken = hashedRestToken;
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save();

        const resetLink = `${process.env.CLIENT_URL}/api/v1/password/reset/${resetToken}`;
        const message = getResetPasswordTemplate(user.name, resetLink);
        console.log(resetToken, 'resetToken');
        console.log(hashedRestToken, 'hashedRestToken');

        try {
            await MailService.sendEmail({
                to: user.email,
                subject: 'ItShop password recovery',
                message,
            });
            res.json({
                message: 'A reset link has been sent to your email address',
            });
        } catch (e) {
            const error = e as Error;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            next(new ErrorHandler(error.message, 500));
        }
    }
);

// POST => /api/v1/password/reset
export const resetPassword = catchAsyncErrors<PasswordResetSchema>(
    async (req, res, next) => {
        const resetPasswordToken = PasswordService.hashToken(req.params.token);
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(
                new ErrorHandler(
                    'Reset password token is inactive or has been expired',
                    400
                )
            );
        }

        if (req.body.password !== req.body.comparedPassword) {
            return next(new ErrorHandler('Passwords do not match', 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        const tokenService = await TokenService.getInstance();
        const { accessToken, refreshToken } = await tokenService.getJwtTokens(
            user._id
        );
        await tokenService.saveRefreshToken(user._id, refreshToken);
        tokenService.sendTokens(res, accessToken, refreshToken);
    }
);

// GET => /api/v1/me
export const getUserProfile = catchAsyncErrors<undefined, UserModel>(
    (req, res) => {
        const user = req.user;
        res.json(user);
    }
);

// PUT => /api/v1/password/update
export const updatePassword = catchAsyncErrors<PasswordUpdateSchema>(
    async (req, res, next) => {
        const user = await User.findById(req.user._id).select('+password');
        const isPasswordMatched = await user.comparePasswords(
            req.body.oldPassword
        );

        if (!isPasswordMatched) {
            return next(new ErrorHandler('Old password is invalid', 400));
        }

        const tokenService = await TokenService.getInstance();
        await tokenService.destroyJwtToken(user._id);

        user.password = req.body.password;
        user.save();

        res.json({
            success: true,
        });
    }
);

// PUT => /api/v1/me/update
export const updateUserProfile = catchAsyncErrors<
    UpdateUserProfileSchema,
    UserModel
>(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
    });
    res.json(updatedUser);
});

// GET => /api/v1/admin/users
export const getAllUsers = catchAsyncErrors<undefined, UserModel[]>(
    async (req, res) => {
        const users = await User.find();
        res.json(users);
    }
);

// GET => /api/v1/admin/users/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User not found with ${req.params.id} id`, 404)
        );
    }

    res.json(user);
});

// PUT => /api/v1/admin/users/:id
export const updateUserDetails = catchAsyncErrors(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updatedUser);
});

// DELETE => /api/v1/admin/users/:id

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User not found with ${user._id} id`, 404)
        );
    }

    await user.deleteOne();

    res.json({
        success: true,
    });
});
