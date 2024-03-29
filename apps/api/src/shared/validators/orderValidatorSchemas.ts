import {IOrder} from "@it-shop/types";

export type NewOrderSchema = Omit<IOrder, 'createdAt' | 'updatedAt' | 'user' | 'deliveredAt'>

