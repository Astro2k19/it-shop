import { IsOptional, IsString } from 'class-validator';

export class ConnectTokenDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    userId?: string;
}
