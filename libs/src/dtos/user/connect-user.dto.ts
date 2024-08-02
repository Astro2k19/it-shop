import { IsOptional, IsString } from 'class-validator';

export class ConnectUserDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    email?: string;
}
