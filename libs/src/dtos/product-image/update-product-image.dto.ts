import { IsString } from 'class-validator';

export class UpdateProductImageDto {
    @IsString()
    public_id: string;

    @IsString()
    url: string;
}
