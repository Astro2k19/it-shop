import { routerConfig } from '../config/routerConfig';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from './RoleGuard';
import { ErrorBoundary } from '@/pages/ErrorBoundary';
import { baseLayout } from '@/app/layouts/baseLayout';
import { ProtectedRouteType } from '@/shared/router/types';

export const AppRouter = () => {
    const renderRoute = ([_, value]: [
        key: string,
        value: ProtectedRouteType
    ]) => {
        const element = {
            path: value.path,
            element: value.element,
        };

        if (value.isProtected) {
            return {
                element: <RoleGuard requiredRoles={value.requiredRoles} />,
                errorElement: <ErrorBoundary />,
                children: [
                    {
                        element: <ProtectedRoute />,
                        children: [element],
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
