import mongoose, { Require_id, Types } from 'mongoose';

export type PaymentMethod = 'COD' | 'Card';
export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';

type OrderProductInfo = {
    name: string;
    quantity: number;
    image: string;
    price: number;
    product: Types.ObjectId;
};

export type Order = Require_id<{
    user: Types.ObjectId;
    shippingInfo: {
        country: string;
        city: string;
        address: string;
        zipCode: string;
        phoneNumber: string;
    };
    orderItems: OrderProductInfo[];
    paymentMethod: PaymentMethod;
    paymentInfo: {
        id: string;
        status: string;
    };
    itemsPrice: number;
    taxAmount: number;
    shippingAmount: number;
    totalAmount: number;
    orderStatus?: OrderStatus;
    deliveredAt: number;
    createdAt: mongoose.Schema.Types.Date;
    updatedAt: mongoose.Schema.Types.Date;
}>;
