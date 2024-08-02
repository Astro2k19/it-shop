import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderPaymentInfoDto {
    @IsNotEmpty()
    @IsString()
    status: string;
}
