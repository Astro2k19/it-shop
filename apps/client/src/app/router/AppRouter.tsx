import { routerConfig } from './routerConfig';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from './RoleGuard';
import { ErrorBoundary } from '@/pages/errorBoundary';
import { baseLayout } from '@/app/layouts/baseLayout';
import { PersistentLogin } from './PersistentLogin';
import { ProtectedRouteType } from './routerConfig';
import { baseLayoutWithProductsFilter } from '@/app/layouts/baseLayoutWithProductsFilter';
import { getMainRoute } from '@/shared/router';
import { Home } from '@/pages/home';
import { UserRoles } from '@it-shop/types';
import { GuestRoute } from '@/app/router/GuestRoute';

const getProtectedRoute = (
    element: RouteObject,
    requiredRoles?: UserRoles[]
) => {
    return {
        element: <PersistentLogin />,
        children: [
            {
                element: <RoleGuard requiredRoles={requiredRoles} />,
                children: [
                    {
                        element: <ProtectedRoute />,
                        children: [element],
                    },
                ],
            },
        ],
    };
};

export const AppRouter = () => {
    const renderRoute = ([_, value]: [
        key: string,
        value: ProtectedRouteType
    ]) => {
        const element: RouteObject = {
            path: value.path,
            element: value.element,
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

        console.log(element.path);

        return {
            element: <PersistentLogin />,
            children: [element],
        };
    };

    return createBrowserRouter([
        {
            element: baseLayout,
            children: Object.entries(routerConfig).map(renderRoute),
        },
        {
            element: baseLayoutWithProductsFilter,
            children: [
                {
                    path: getMainRoute(),
                    element: <Home />,
                    index: true,
                },
            ],
        },
    ]);
};
