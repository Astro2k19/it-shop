import { OrderStatus, PaymentMethod } from '@prisma/client';

export class OrderDto {
    id: string;
    productsPrice: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    shippingAmount: number;
    taxAmount: number;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
    deliveredAt: Date | null;
}
