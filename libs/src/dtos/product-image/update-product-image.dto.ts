import { IsOptional, IsString } from 'class-validator';

export class UpdateProductImageDto {
    @IsOptional()
    @IsString()
    public_id?: string;

    @IsOptional()
    @IsString()
    url?: string;
}
