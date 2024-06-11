import { useFormContext } from 'react-hook-form';
import { ButtonHTMLAttributes } from 'react';

type InputProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...props }: InputProps) => {
    const {
        formState: { isSubmitting },
    } = useFormContext();

    return (
        <button
            {...props}
            type="submit"
            disabled={isSubmitting}
            className="btn w-100 py-2"
        >
            {children}
        </button>
    );
};
