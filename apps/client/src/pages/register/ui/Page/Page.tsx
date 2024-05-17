import { RegisterForm } from '@/features/authentication/register';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getMainRoute } from '@/shared/router';

export const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onComplete = useCallback(() => {
        navigate(location.state?.returnUrl || getMainRoute());
    }, [location.state?.returnUrl, navigate]);

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <RegisterForm onComplete={onComplete} />
            </div>
        </div>
    );
};
