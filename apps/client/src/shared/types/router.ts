import { RouteObject } from 'react-router-dom';
import { UserRoles } from '@/entities/User';

export type ProtectedRouteType = RouteObject & {
    requiredRoles?: UserRoles[];
    isProtected?: boolean;
};
