import { RouteObject } from 'react-router-dom';
import { UserRoles } from '@it-shop/types';

export type ProtectedRouteType = RouteObject & {
    requiredRoles?: UserRoles[];
    isProtected?: boolean;
};
