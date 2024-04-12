import { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/shared/model';
import { getRoles } from '@/entities/Session';
import { UserRoles } from '@it-shop/types';
import { getForbiddenRoute } from '@/shared/router';

interface RoleGuardProps {
    requiredRoles?: UserRoles[];
}
export const RoleGuard = ({ requiredRoles }: RoleGuardProps) => {
    const userRoles = useAppSelector(getRoles);
    const hasRequiredRoles = useMemo(() => {
        if (!requiredRoles) {
            return true;
        }

        return requiredRoles.some((role) => userRoles?.includes(role));
    }, [requiredRoles, userRoles]);

    if (!hasRequiredRoles) {
        return <Navigate to={getForbiddenRoute()} replace />;
    }

    return <Outlet />;
};
