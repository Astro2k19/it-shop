import { IsOptional, IsString } from 'class-validator';

export class ConnectOrderDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    paymentInfoId?: string;

    @IsOptional()
    @IsString()
    shippingInfoId?: string;
}
