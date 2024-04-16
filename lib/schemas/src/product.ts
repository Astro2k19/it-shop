import { z } from 'zod';
import { productCategories } from '../../types/src';

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
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.string().optional(),
    category: z.string().optional(),
    stock: z.string().optional(),
    seller: z.string().optional(),
    page: z.string().optional(),
    keyword: z.string().optional(),
});

export type NewProductSchemaType = z.infer<typeof newProductSchema>;
export type UpdateProductSchemaType = z.infer<typeof updateProductSchema>;
export type ProductsFilterQuerySchemaType = z.infer<
    typeof productsFilterQuerySchema
>;
