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

export const productsFilterQuerySchema = z
    .object({
        page: z.string(),
        keyword: z.string(),
        category: z.string(),
        price: z.object({
            gte: z.string(),
            lte: z.string(),
        }),
        ratings: z.object({
            gte: z.string(),
        }),
    })
    .deepPartial();

export type NewProductSchemaType = z.infer<typeof newProductSchema>;
export type UpdateProductSchemaType = z.infer<typeof updateProductSchema>;
export type ProductsFilterQuerySchemaType = z.infer<
    typeof productsFilterQuerySchema
>;
