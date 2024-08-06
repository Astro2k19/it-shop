import {
    IsArray,
    IsDecimal,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductImageDto } from '../product-image/create-product-image.dto';

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
    @Type(() => CreateProductImageDto)
    images: CreateProductImageDto[];

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @MaxLength(5)
    price: number;

    @IsNotEmpty()
    @IsString()
    seller: string;

    @IsNotEmpty()
    @IsInt()
    stock: number;
}
