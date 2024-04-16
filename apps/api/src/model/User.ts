import mongoose, { HydratedDocument } from 'mongoose';
import { UserSchema } from '@it-shop/types';
import bgcryp from 'bcrypt';
import PasswordService from '../services/PasswordService';
import { roles } from '@it-shop/schemas';

interface UserModelMethods {
    comparePasswords: (password: string) => Promise<boolean>;
}

type HydratedUser = HydratedDocument<UserSchema, UserModelMethods>;

const UserModel = new mongoose.Schema<HydratedUser>(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            maxlength: [50, 'Your name cannot exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minlength: [6, 'Your password must be at least 6 characters'],
            select: false,
        },
        avatar: {
            public_id: String,
            url: String,
        },
        roles: {
            type: [String],
            enum: roles,
            default: ['User'],
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true }
);

UserModel.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await PasswordService.hashPassword(this.password);
});

UserModel.methods.comparePasswords = async function (password: string) {
    return bgcryp.compare(password, this.password);
};

export default mongoose.model('User', UserModel);
