import { IsNotEmpty, IsString } from 'class-validator';

export class ImageDto {
    @IsNotEmpty()
    @IsString()
    public_id: string;

    @IsNotEmpty()
    @IsString()
    url: string;
}
