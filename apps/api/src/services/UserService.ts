import UserModel from '../model/User';
import ErrorHandler from '../shared/utils/ErrorHandler';
import TokenService from './TokenService';
import mongoose from 'mongoose';
import PasswordService from './PasswordService';
import { getResetPasswordTemplate } from '../shared/utils/getResetPasswordTemplate';
import { MailService } from './MailService';
import { User } from '@it-shop/types';

export class UserService {
    private readonly tokenService: TokenService;
    private readonly mailService: MailService;

    constructor(tokenService: TokenService, mailService: MailService) {
        this.tokenService = tokenService;
        this.mailService = mailService;
    }

    async register(email: string, name: string, password: string) {
        const user = UserModel.findOne({ email });
        if (user) {
            throw new ErrorHandler('Email is already taken', 409);
        }
        const { _id: userId } = await UserModel.create({
            name,
            email,
            password,
        });
        const { accessToken, refreshToken } =
            await this.tokenService.getJwtTokens(userId);
        await this.tokenService.saveRefreshToken(userId, refreshToken);
        return { accessToken, refreshToken };
    }

    async login(email: string, password: string) {
        const user = await UserModel.findOne({ email }).select('+password');

        if (!user) {
            throw new ErrorHandler('Invalid email & password', 401);
        }

        const isPassEqual = await user.comparePasswords(password);
        if (!isPassEqual) {
            throw new ErrorHandler('Invalid email & password', 401);
        }

        const { accessToken, refreshToken } =
            await this.tokenService.getJwtTokens(user._id);
        await this.tokenService.saveRefreshToken(user._id, refreshToken);
        return { accessToken, refreshToken };
    }

    async logout(userId: mongoose.Types.ObjectId, refreshToken?: string) {
        if (!refreshToken) {
            throw new ErrorHandler('Login first to access this resource', 401);
        }
        await this.tokenService.removeToken(refreshToken);
        await this.tokenService.destroyJwtToken(userId);
    }

    async refresh(refreshToken?: string) {
        if (!refreshToken) {
            throw new ErrorHandler(`Login first to access this resource`, 401);
        }

        const tokenFromDb = await this.tokenService.findToken(refreshToken);
        const decoded = await this.tokenService.verifyRefreshToken(
            refreshToken
        );

        if (!tokenFromDb || !decoded) {
            throw new ErrorHandler(`Login first to access this resource`, 401);
        }

        return this.tokenService.getJwtAccessToken(tokenFromDb.user);
    }

    async forgotPassword(email: string) {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new ErrorHandler('Not found user with such email', 404);
        }

        const { resetToken, hashedRestToken, resetPasswordExpire } =
            PasswordService.getResetPasswordToken();

        user.resetPasswordToken = hashedRestToken;
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save();

        const resetLink = `${process.env.CLIENT_URL}/api/v1/password/reset/${resetToken}`;
        const message = getResetPasswordTemplate(user.name, resetLink);

        try {
            await this.mailService.sendEmail({
                to: user.email,
                subject: 'ItShop password recovery',
                message,
            });
        } catch (e) {
            const error = e as Error;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            throw new ErrorHandler(error.message, 500);
        }
    }

    async resetPassword(
        password: string,
        comparedPassword: string,
        token: string
    ) {
        const resetPasswordToken = PasswordService.hashToken(token);
        const user = await UserModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            throw new ErrorHandler(
                'Reset password token is inactive or has been expired',
                400
            );
        }
        if (password !== comparedPassword) {
            throw new ErrorHandler('Passwords do not match', 400);
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        const { accessToken, refreshToken } =
            await this.tokenService.getJwtTokens(user._id);
        await this.tokenService.saveRefreshToken(user._id, refreshToken);
        return { accessToken, refreshToken };
    }

    async updatePassword(
        userId: mongoose.Types.ObjectId,
        newPassword: string,
        oldPassword: string
    ) {
        const user = await UserModel.findById(userId).select('+password');
        const isPasswordMatched = await user.comparePasswords(oldPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler('Old password is invalid', 400);
        }

        await this.tokenService.destroyJwtToken(user._id);

        user.password = newPassword;
        user.save();
    }

    async updateUser(userId: mongoose.Types.ObjectId, data: Partial<User>) {
        return UserModel.findByIdAndUpdate(userId, data, {
            new: true,
        });
    }

    async getUsers() {
        const users = await UserModel.find();
        return users;
    }

    async getUserById(id: mongoose.Types.ObjectId | string) {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new ErrorHandler(`User not found with ${id} id`, 404);
        }
        return user;
    }

    async removeUserById(id: mongoose.Types.ObjectId | string) {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new ErrorHandler(`User not found with ${id} id`, 404);
        }
        await user.deleteOne();
    }
}
