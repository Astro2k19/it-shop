import { IOrder } from '../Order.model';

export type NewOrderSchema = Omit<
    IOrder,
    'createdAt' | 'updatedAt' | 'user' | 'deliveredAt'
>;
