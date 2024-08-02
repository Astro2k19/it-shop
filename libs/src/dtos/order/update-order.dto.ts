import { PaymentMethod } from '@prisma/client';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDto {
    @IsOptional()
    @IsNumber()
    productsPrice?: number;

    @IsOptional()
    paymentMethod?: PaymentMethod;

    @IsOptional()
    @IsNumber()
    shippingAmount?: number;

    @IsOptional()
    @IsNumber()
    taxAmount?: number;

    @IsOptional()
    @IsNumber()
    totalAmount?: number;

    @IsOptional()
    @IsDateString()
    deliveredAt?: Date | null;
}
