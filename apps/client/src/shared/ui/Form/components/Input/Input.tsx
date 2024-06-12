import { useFormContext, RegisterOptions } from 'react-hook-form';

type InputProps = {
    name: string;
    type?: string;
    label?: string;
    registerOptions?: RegisterOptions;
};

export const Input = ({
    name,
    type = 'text',
    registerOptions,
    label,
    ...props
}: InputProps) => {
    const {
        register,
        formState: { errors, isSubmitting },
    } = useFormContext();

    const registration = register(name, {
        ...registerOptions,
        setValueAs: (value) => {
            if (value === '') return undefined;
            return value;
        },
    });

    return (
        <div className="d-flex flex-column gap-1">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                {...props}
                type={type}
                id={name}
                className="form-control"
                disabled={isSubmitting}
                {...registration}
            />
            {errors[name] && (
                <div
                    className="alert alert-danger p-1 small fw-lighter"
                    role="alert"
                >
                    {errors[name]?.message as string}
                </div>
            )}
        </div>
    );
};
