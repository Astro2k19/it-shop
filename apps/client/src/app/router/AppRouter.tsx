import { appRouterConfig, ProtectedRouteType } from './routerConfig';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from './RoleGuard';
import { ErrorBoundary } from '@/pages/errorBoundary';
import { baseLayout } from '@/app/layouts/baseLayout';
import { PersistentLogin } from './PersistentLogin';
import { baseLayoutWithProductsFilter } from '../layouts/baseLayoutWithProductsFilter';
import { getMainRoute } from '@/shared/router';
import { Home } from '@/pages/home';
import { UserRoles } from '@it-shop/types';
import { GuestRoute } from './GuestRoute';
import { Page } from '@/widgets/Page/ui/Page';

const getProtectedRoute = (
    element: RouteObject,
    requiredRoles?: UserRoles[]
) => {
    return {
        element: <RoleGuard requiredRoles={requiredRoles} />,
        children: [
            {
                element: <ProtectedRoute />,
                children: [element],
            },
        ],
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

const renderRoute = ([_, value]: [key: string, value: ProtectedRouteType]) => {
    const element: RouteObject = {
        path: value.path,
        element: <Page>(value.element)</Page>,
        errorElement: <ErrorBoundary />,
    };

    if (value.isProtected) {
        return getProtectedRoute(element, value.requiredRoles);
    }

    if (value.isForGuest) {
        return {
            element: <GuestRoute />,
            children: [element],
        };
    }

    return element;
};
