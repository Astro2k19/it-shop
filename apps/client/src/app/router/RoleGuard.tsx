import { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/shared/model';
import { UserRoles } from '@it-shop/types';
import { getForbiddenRoute } from '@/shared/router';
import { getUserRoles } from '@/entities/user';

type RoleGuardProps = {
    requiredRoles?: UserRoles[];
};
export const RoleGuard = ({ requiredRoles }: RoleGuardProps) => {
    const userRoles = useAppSelector(getUserRoles);
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
