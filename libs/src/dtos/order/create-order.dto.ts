import { PaymentMethod } from '@prisma/client';
import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    productsPrice: number;

    @IsNotEmpty()
    paymentMethod: PaymentMethod;

    @IsNotEmpty()
    @IsNumber()
    shippingAmount: number;

    @IsNotEmpty()
    @IsNumber()
    taxAmount: number;

    @IsNotEmpty()
    @IsNumber()
    totalAmount: number;

    @IsOptional()
    @IsDateString()
    deliveredAt?: Date | null;
}
