import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectOrderPaymentInfoDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}
