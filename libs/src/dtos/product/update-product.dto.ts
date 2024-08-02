import {
    IsArray,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProductImageDto } from '../product-image/update-product-image.dto';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateProductImageDto)
    images?: UpdateProductImageDto[];

    @IsOptional()
    @IsString()
    @MaxLength(200)
    name?: string;

    @IsOptional()
    @IsNumber()
    @MaxLength(5)
    price?: number;

    @IsOptional()
    @IsString()
    seller?: string;

    @IsOptional()
    @IsInt()
    stock?: number;
}
