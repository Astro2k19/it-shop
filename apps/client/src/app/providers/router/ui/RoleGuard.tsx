import { ReactNode, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { UserRoles } from '@/entities/User';

interface RoleGuardProps {
    requiredRoles?: UserRoles[];
    children: ReactNode;
}
export const RoleGuard = ({ requiredRoles, children }: RoleGuardProps) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const userRoles: UserRoles[] = ['Admin']; //temp hard code
    const hasRequiredRoles = useMemo(() => {
        if (!requiredRoles) {
            return true;
        }

        return requiredRoles.some((role) => userRoles.includes(role));
    }, [requiredRoles, userRoles]);

    if (!hasRequiredRoles) {
        return <Navigate to={'/forbidde'} replace />;
    }

    return children;
};
