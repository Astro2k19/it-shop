import catchAsyncErrors from '../shared/middlewares/catchAsyncErrors';
import { JwtTokenService } from '../services/JwtTokenService';
import { MailService } from '../services/MailService';

import { User, UserSchema } from '@it-shop/types';
import {
    ForgotPasswordSchemaType,
    LoginSchemaType,
    RegisterSchemaType,
    ResetPasswordSchemaType,
    UpdatePasswordSchemaType,
    UpdateUserProfileSchemaType,
} from '@it-shop/schemas';
import { UserService } from '../services/UserService';
import { CookieService } from '../services/CookieService';
import ms from 'ms';
import { JwtTokenRepository } from '../services/JwtTokenRepository';
import TokenModel from '../model/Token';
export const jwtTokenService = new JwtTokenService();
export const userService = new UserService(
    jwtTokenService,
    new JwtTokenRepository(TokenModel),
    new MailService()
);

const cookieService = new CookieService({
    httpOnly: true,
    secure: true,
    maxAge: ms(process.env.REFRESH_TOKEN_EXPIRE),
    sameSite: 'none',
});

// POST => /api/v1/register
export const registerUser = catchAsyncErrors<RegisterSchemaType>(
    async (req, res) => {
        const { email, name, password } = req.body;
        const { refreshToken, accessToken } = await userService.register(
            email,
            name,
            password
        );
        cookieService.set(res, 'refreshToken', refreshToken);
        res.status(201).json({
            accessToken,
        });
    }
);

// POST => /api/v1/login
export const loginUser = catchAsyncErrors<LoginSchemaType>(async (req, res) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userService.login(
        email,
        password
    );
    cookieService.set(res, 'refreshToken', refreshToken);
    res.status(201).json({
        accessToken,
    });
});

// POST => /api/v1/refresh
export const refresh = catchAsyncErrors(async (req, res, next) => {
    try {
        const accessToken = await userService.refresh(req.cookies.refreshToken);
        res.json({
            accessToken,
        });
    } catch (e) {
        next(e);
    }
});

// POST => /api/v1/logout

export const logoutUser = catchAsyncErrors(async (req, res) => {
    const { refreshToken } = req.cookies;

    await userService.logout(req.user._id, refreshToken);
    cookieService.clear(res, 'refreshToken');

    res.status(200).json({
        message: 'logout',
    });
});

// POST => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors<ForgotPasswordSchemaType>(
    async (req, res) => {
        const { email } = req.body;
        await userService.forgotPassword(email);
        res.json({
            message: 'A reset link has been sent to your email address',
        });
    }
);

// POST => /api/v1/password/reset
export const resetPassword = catchAsyncErrors<ResetPasswordSchemaType>(
    async (req, res) => {
        const { refreshToken, accessToken } = await userService.resetPassword(
            req.body.password,
            req.body.comparedPassword,
            req.params.token
        );
        cookieService.set(res, 'refreshToken', refreshToken);
        res.status(201).json({
            accessToken,
        });
    }
);

// GET => /api/v1/me
export const getUserProfile = catchAsyncErrors<undefined, UserSchema>(
    (req, res) => {
        const user = req.user;
        res.json(user);
    }
);

// PUT => /api/v1/password/update
export const updatePassword = catchAsyncErrors<UpdatePasswordSchemaType>(
    async (req, res) => {
        await userService.updatePassword(
            req.user._id,
            req.body.password,
            req.body.oldPassword
        );
        res.json({
            success: true,
        });
    }
);

// PUT => /api/v1/me/update
export const updateUserProfile = catchAsyncErrors<
    UpdateUserProfileSchemaType,
    User
>(async (req, res) => {
    const updatedUser = await userService.updateUser(req.user._id, req.body);
    res.json(updatedUser);
});

// PUT => /api/v1/admin/users/:id
export const updateUserDetails = catchAsyncErrors<User>(async (req, res) => {
    const updatedUser = await userService.updateUser(req.user._id, req.body);
    res.json(updatedUser);
});

// GET => /api/v1/admin/users
export const getAllUsers = catchAsyncErrors<undefined, User[]>(
    async (_, res) => {
        const users = await userService.getUsers();
        res.json(users);
    }
);

// GET => /api/v1/admin/users/:id
export const getUserDetails = catchAsyncErrors(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
});

// DELETE => /api/v1/admin/users/:id
export const deleteUser = catchAsyncErrors(async (req, res) => {
    await userService.removeUserById(req.params.id);
    res.json({
        success: true,
    });
});
