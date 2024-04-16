import { z } from 'zod';
import { orderStatuses, paymentMethods } from '@it-shop/types';

export const newOrderSchema = z.object({
    shippingInfo: z.object({
        country: z.string(),
        city: z.string(),
        address: z.string(),
        zipCode: z.string(),
        phoneNumber: z.string(),
    }),
    orderItems: z.array(
        z.object({
            name: z.string(),
            quantity: z.number(),
            image: z.string(),
            price: z.number(),
            product: z.string(),
        })
    ),
    paymentMethod: z.enum(paymentMethods),
    paymentInfo: z.object({
        id: z.string(),
        status: z.string(),
    }),
    itemsPrice: z.number(),
    taxAmount: z.number(),
    shippingAmount: z.number(),
    totalAmount: z.number(),
    orderStatus: z.enum(orderStatuses),
});

export const updateOrderSchema = z.object({
    orderStatus: z.enum(orderStatuses),
});

export type NewOrderSchemaType = z.infer<typeof newOrderSchema>;
export type OrderUpdateSchema = z.infer<typeof updateOrderSchema>;
