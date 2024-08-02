import { IsOptional, IsString } from 'class-validator';

export class UpdateOrderPaymentInfoDto {
    @IsOptional()
    @IsString()
    status?: string;
}
