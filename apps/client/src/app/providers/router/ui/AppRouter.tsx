import { routerConfig } from '../config/config';
import { ProtectedRouteType } from '@/shared/types/router';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { Suspense } from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from '@/app/providers/router/ui/RoleGuard';

export const AppRouter = () => {
    const renderAppRoute = ([key, value]: [
        key: string,
        value: ProtectedRouteType
    ]) => {
        const element = <Suspense>{value.element}</Suspense>;

        return (
            <Route
                key={key}
                path={value.path}
                element={
                    value.isProtected ? (
                        <RoleGuard requiredRoles={value.requiredRoles}>
                            <ProtectedRoute>{element}</ProtectedRoute>
                        </RoleGuard>
                    ) : (
                        element
                    )
                }
            />
        );
    };

    return createBrowserRouter(
        createRoutesFromElements(
            Object.entries(routerConfig).map(renderAppRoute)
        )
    );
};
