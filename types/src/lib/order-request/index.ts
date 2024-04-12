import { Order } from '../order';

export type NewOrderSchema = Omit<
    Order,
    'createdAt' | 'updatedAt' | 'user' | 'deliveredAt'
>;
