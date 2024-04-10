import { UserRoles } from '../User.model';

export interface RegisterSchema {
    name: string;
    email: string;
    password: string;
}

export interface LoginSchema {
    email: string;
    password: string;
}

export interface PasswordForgotSchema {
    email: string;
}

export interface PasswordResetSchema {
    password: string;
    comparedPassword: string;
}

export interface PasswordUpdateSchema {
    password: string;
    oldPassword: string;
}

export interface UpdateUserProfileSchema {
    name: string;
    email: string;
}

export interface UpdateUserDetailsSchema {
    name: string;
    email: string;
    roles: UserRoles[];
}
