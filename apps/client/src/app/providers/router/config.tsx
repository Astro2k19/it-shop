// @ts-expect-error: test
import { type RouteProps } from 'react-router-dom';

type ProtectedRoute = RouteProps & {
    requiredRoles: [];
    isProtected: boolean;
};

export const routerConfig: ProtectedRoute[] = [
    {
        path: '',
    },
];
