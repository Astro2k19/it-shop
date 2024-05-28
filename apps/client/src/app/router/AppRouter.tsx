import { appRouterConfig, ProtectedRouteType } from './routerConfig';
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
import { Page } from '@/widgets/Page';

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

const getPageWrapper = (route: RouteObject, sessionLoader = true) => {
    return {
        element: <Page sessionLoader={sessionLoader} />,
        children: [route],
    };
};

export const AppRouter = () => {
    const baseRoutes = [
        {
            element: <PersistentLogin />,
            children: Object.entries(appRouterConfig).map(renderRoute),
        },
    ];

    const baseRoutesWithFilters = [
        getPageWrapper(
            {
                element: <PersistentLogin />,
                children: [
                    {
                        path: getMainRoute(),
                        element: <Home />,
                        index: true,
                    },
                ],
            },
            true
        ),
    ];

    return createBrowserRouter([
        {
            element: baseLayout,
            children: baseRoutes,
        },
        {
            element: baseLayoutWithProductsFilter,
            children: baseRoutesWithFilters,
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

    return getPageWrapper(route, route.sessionLoader);
};
