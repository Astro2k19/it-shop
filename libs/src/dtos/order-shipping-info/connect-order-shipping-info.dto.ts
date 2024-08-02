import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectOrderShippingInfoDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}
