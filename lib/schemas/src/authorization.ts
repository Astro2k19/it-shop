import { z } from 'zod';
export const roles = ['User', 'Admin'] as const;

export const registerSchema = z.object({
    name: z
        .string({
            required_error: 'Please enter your name',
        })
        .trim()
        .max(50, { message: 'Your name cannot exceed 50 characters' }),
    email: z
        .string({
            required_error: 'Please enter your email',
        })
        .trim()
        .email({
            message: 'Email is not valid',
        }),
    password: z
        .string({
            required_error: 'Please enter your password',
        })
        .trim()
        .min(6, {
            message: 'Your password must be at least 6 characters',
        }),
});

export const loginSchema = z.object({
    email: z
        .string({
            required_error: 'Please enter your email',
        })
        .email({
            message: 'Email is not valid',
        })
        .trim(),
    password: z
        .string({
            required_error: 'Please enter your password',
        })
        .trim()
        .min(6, {
            message: 'Your password must be at least 6 characters',
        }),
});

export const forgotPasswordSchema = z.object({
    email: z
        .string({
            required_error: 'Please enter your email',
        })
        .trim()
        .email({
            message: 'Email is not valid',
        }),
});

export const resetPasswordSchema = z
    .object({
        password: z
            .string({
                required_error: 'Please enter your password',
            })
            .trim()
            .min(6, {
                message: 'Your password must be at least 6 characters',
            }),
        comparedPassword: z
            .string({
                required_error: 'Please enter your compared password',
            })
            .trim()
            .min(6, {
                message: 'Your password must be at least 6 characters',
            }),
    })
    .superRefine(({ comparedPassword, password }, ctx) => {
        if (comparedPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                path: ['comparedPassword'],
                message: 'The passwords did not match',
            });
        }
    });

export const updatePasswordSchema = z
    .object({
        password: z
            .string({
                required_error: 'Please enter your new password',
            })
            .trim()
            .min(6, {
                message: 'Your password must be at least 6 characters',
            }),
        oldPassword: z
            .string({
                required_error: 'Please enter your old password',
            })
            .trim(),
    })
    .superRefine(({ oldPassword, password }, ctx) => {
        if (oldPassword === password) {
            ctx.addIssue({
                code: 'custom',
                path: ['password'],
                message: 'The new password cannot match the old one',
            });
        }
    });

export const updateUserProfileSchema = z.object({
    name: z
        .string()
        .trim()
        .max(50, { message: 'Your name cannot exceed 50 characters' })
        .optional(),
    email: z
        .string()
        .trim()
        .email({
            message: 'Email is not valid',
        })
        .optional(),
});

export const updateUserDetailsSchema = z.object({
    name: z
        .string()
        .trim()
        .max(50, { message: 'Your name cannot exceed 50 characters' })
        .optional(),
    email: z
        .string()
        .trim()
        .email({
            message: 'Email is not valid',
        })
        .optional(),
    roles: z.array(z.enum(roles)).optional(),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
export type UpdateUserProfileSchemaType = z.infer<
    typeof updateUserProfileSchema
>;
export type UpdateUserDetailsSchemaType = z.infer<
    typeof updateUserDetailsSchema
>;
