import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectOrderProductDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}
