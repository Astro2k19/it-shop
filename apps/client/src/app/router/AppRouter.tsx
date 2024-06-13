import {
    appRouterConfig,
    profileRouterConfig,
    ProtectedRouteType,
} from './routerConfig';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from './RoleGuard';
import { baseLayout } from '@/app/layouts/baseLayout';
import { PersistentLogin } from './PersistentLogin';
import { baseLayoutWithProductsFilter } from '../layouts/baseLayoutWithProductsFilter';
import { getMainRoute } from '@/shared/router';
import { Home } from '@/pages/home';
import { UserRoles } from '@it-shop/types';
import { GuestRoute } from './GuestRoute';
import { baseLayoutWithProfileMenu } from '../layouts/baseLayoutWithProfileMenu';

const getProtectedRoute = (
    element: RouteObject,
    requiredRoles?: UserRoles[]
) => {
    return {
        element: <ProtectedRoute />,
        children: [
            {
                element: <RoleGuard requiredRoles={requiredRoles} />,
                children: [element],
            },
        ],
    };
};

export const AppRouter = () => {
    const baseRoutes = Object.entries(appRouterConfig).map(renderRoute);
    const baseRoutesWithFilters = [
        {
            path: getMainRoute(),
            element: <Home />,
            index: true,
        },
    ];
    const baseRoutesWithProfileMenu =
        Object.entries(profileRouterConfig).map(renderRoute);

    return createBrowserRouter([
        {
            element: <PersistentLogin />,
            children: [
                {
                    element: baseLayout,
                    children: baseRoutes,
                },
                {
                    element: baseLayoutWithProductsFilter,
                    children: baseRoutesWithFilters,
                },
                {
                    element: baseLayoutWithProfileMenu,
                    children: baseRoutesWithProfileMenu,
                },
            ],
        },
    ]);
};

const renderRoute = ([_, route]: [key: string, value: ProtectedRouteType]) => {
    if (route.isProtected) {
        route = getProtectedRoute(route, route.requiredRoles);
    } else if (route.isForGuest) {
        route = {
            element: <GuestRoute />,
            children: [route],
        };
    }
    return route;
};
