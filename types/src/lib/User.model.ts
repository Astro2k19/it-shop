import mongoose, { Document } from 'mongoose';

export interface UserModel extends Document {
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
}

export interface IUser {
    name: string;
    email: string;
    avatar: {
        public_id: string;
        url: string;
    };
    roles: UserRoles[];
}

export type UserRoles = 'User' | 'Admin';
