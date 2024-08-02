import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductImageDto {
    @IsNotEmpty()
    @IsString()
    public_id: string;

    @IsNotEmpty()
    @IsString()
    url: string;
}
