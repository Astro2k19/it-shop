import { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserRoles } from '@/entities/User';

interface RoleGuardProps {
    requiredRoles?: UserRoles[];
}
export const RoleGuard = ({ requiredRoles }: RoleGuardProps) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const userRoles: UserRoles[] | undefined = ['Admin']; //temp hard code
    const hasRequiredRoles = useMemo(() => {
        if (!requiredRoles) {
            return true;
        }

        return requiredRoles.some((role) => userRoles?.includes(role));
    }, [requiredRoles, userRoles]);

    if (!hasRequiredRoles) {
        return <Navigate to={'/forbidden'} replace />;
    }

    return <Outlet />;
};
