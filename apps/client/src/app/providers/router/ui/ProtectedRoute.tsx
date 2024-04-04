import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
}
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const userData = true; // temp hard code
    const location = useLocation();

    if (!userData) {
        return <Navigate to={'/'} state={location.state} />;
    }

    return children;
};
