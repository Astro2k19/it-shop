import { IsOptional, IsString } from 'class-validator';

export class UpdateOrderShippingInfoDto {
    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    zipCode?: string;
}
