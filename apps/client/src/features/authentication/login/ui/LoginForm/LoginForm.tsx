import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema, LoginSchemaType } from '@it-shop/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPasswordForgotRoute, getRegisterRoute } from '@/shared/router';
import { Link } from 'react-router-dom';
import { loginThunk } from '../../model/login';
import { useAppDispatch } from '@/shared/model';

export const LoginForm = () => {
    const {
        setError,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
        await dispatch(loginThunk(data)).then((data) => {
            console.log(data);
        });
    };

    return (
        <form
            className="shadow rounded bg-body"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="mb-4">Login</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    {...register('email')}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    {...register('password')}
                />
            </div>
            <Link to={getPasswordForgotRoute()} className="float-end mb-4">
                Forgot Password?
            </Link>
            <button id="login_button" type="submit" className="btn w-100 py-2">
                LOGIN
            </button>
            <div className="my-3">
                <Link to={getRegisterRoute()} className="float-end">
                    New User?
                </Link>
            </div>
        </form>
    );
};
