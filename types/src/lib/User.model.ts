import mongoose, { Require_id } from 'mongoose';

export type UserSchema = Require_id<{
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    };
    roles: UserRoles[];
    resetPasswordToken: string;
    resetPasswordExpire: number;
    createdAt: mongoose.Schema.Types.Date;
    updatedAt: mongoose.Schema.Types.Date;
}>;

export type User = Require_id<{
    name: string;
    email: string;
    avatar: {
        public_id: string;
        url: string;
    };
    roles: UserRoles[];
}>;

export type UserRoles = 'User' | 'Admin';
