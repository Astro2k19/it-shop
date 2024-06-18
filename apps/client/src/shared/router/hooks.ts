// Todo: fix import from above layer
import { globalRouterConfig } from '@/app/router/routerConfig';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '@/shared/model';
import { getIsAuthorized } from '@/entities/session';
import { getUserRoles } from '@/entities/user';

const useCurrentRouteConfig = () => {
    const location = useLocation();
    return globalRouterConfig.find((route) => route.path === location.pathname);
};

export const useCurrentRouteAccess = () => {
    const isAuthenticated = useAppSelector(getIsAuthorized);
    const userRoles = useAppSelector(getUserRoles);
    const currentRoute = useCurrentRouteConfig();

    const isRouteProtected = currentRoute?.isProtected;
    const areRequiredRolesDefined = !!currentRoute?.requiredRoles;
    const hasRequiredRoles =
        areRequiredRolesDefined &&
        currentRoute.requiredRoles?.some((role) => userRoles?.includes(role));

    return (
        !isRouteProtected ||
        (isAuthenticated && (!areRequiredRolesDefined || hasRequiredRoles))
    );
};
