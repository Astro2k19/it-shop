import { SubmitHandler, useForm } from 'react-hook-form';
import { registerSchema, RegisterSchemaType } from '@it-shop/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/shared/model';
import { registerThunk } from '../model/register';

export const RegisterForm = () => {
    const {
        setError,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
    });
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
        await dispatch(registerThunk(data)).then((data) => {
            console.log(data);
        });
    };

    return (
        <form
            className="shadow rounded bg-body"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="mb-4">Register</h2>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    {...register('name')}
                />
            </div>

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
            <button
                id="register_button"
                type="submit"
                className="btn w-100 py-2"
            >
                REGISTER
            </button>
        </form>
    );
};
