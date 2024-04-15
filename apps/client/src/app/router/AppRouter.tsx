import { routerConfig } from './routerConfig';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from './RoleGuard';
import { ErrorBoundary } from '@/pages/errorBoundary';
import { baseLayout } from '@/app/layouts/baseLayout';
import { PersistentLogin } from './PersistentLogin';
import { ProtectedRouteType } from './routerConfig';

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
            return {
                element: <PersistentLogin />,
                children: [
                    {
                        element: (
                            <RoleGuard requiredRoles={value.requiredRoles} />
                        ),
                        children: [
                            {
                                element: <ProtectedRoute />,
                                children: [element],
                            },
                        ],
                    },
                ],
            };
        }

        return element;
    };

    return createBrowserRouter([
        {
            path: '/',
            element: baseLayout,
            children: Object.entries(routerConfig).map(renderRoute),
        },
    ]);
};
