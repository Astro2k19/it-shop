import { RouteProps } from 'react-router-dom';
import { UserRoles } from '@/entities/User';

export type ProtectedRouteType = RouteProps & {
    requiredRoles?: UserRoles[];
    isProtected?: boolean;
};
