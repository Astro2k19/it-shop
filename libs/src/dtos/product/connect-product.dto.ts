import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectProductDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}
