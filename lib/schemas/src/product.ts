import { z } from 'zod';
import { productCategories } from '@it-shop/types';

export const newProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.enum(productCategories),
    stock: z.number(),
    seller: z.string(),
    images: z.array(
        z.object({
            public_id: z.string(),
            url: z.string(),
        })
    ),
});

export const updateProductSchema = newProductSchema.partial();

export const productsFilterQuerySchema = z.object({
    name: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    price: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
    stock: z.string().optional().nullable(),
    seller: z.string().optional().nullable(),
    page: z.string().optional().nullable(),
    keyword: z.string().optional().nullable(),
});

export type NewProductSchemaType = z.infer<typeof newProductSchema>;
export type UpdateProductSchemaType = z.infer<typeof updateProductSchema>;
export type ProductsFilterQuerySchemaType = z.infer<
    typeof productsFilterQuerySchema
>;
