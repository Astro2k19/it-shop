import { IUser, UserModel } from '@it-shop/types';

export const mapUser = (user: UserModel): IUser => {
    return {
        name: user.name,
        email: user.email,
        roles: user.roles,
        avatar: user.avatar,
    };
};
