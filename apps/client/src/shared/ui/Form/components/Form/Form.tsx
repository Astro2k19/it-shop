import {
    DefaultValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';

type FormProps<TFieldValues extends FieldValues> = {
    title?: string;
    schema: z.Schema<any, any>;
    onSubmit: SubmitHandler<TFieldValues>;
    children: ReactNode;
    defaultValues?: DefaultValues<TFieldValues>;
};

export const Form = <TFieldValues extends FieldValues>({
    title,
    schema,
    onSubmit,
    children,
    defaultValues,
}: FormProps<TFieldValues>) => {
    const methods = useForm<TFieldValues>({
        resolver: zodResolver(schema),
        defaultValues,
    });
    return (
        <FormProvider {...methods}>
            <h2 className="mb-4">{title}</h2>
            <form
                className="shadow rounded bg-body form"
                onSubmit={methods.handleSubmit(onSubmit)}
                noValidate={true}
            >
                {children}
            </form>
        </FormProvider>
    );
};

Form.Input = Input;
Form.Button = Button;
