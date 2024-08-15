import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ImageDto } from '../image';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    images: ImageDto[];

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    seller: string;

    @IsNotEmpty()
    @IsInt()
    stock: number;
}
