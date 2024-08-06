import {
    IsOptional,
    IsString,
    ValidateNested,
    Allow,
    IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class PriceQueryFilter {
    @IsOptional()
    @IsString()
    @Allow()
    gte?: string;

    @IsOptional()
    @IsString()
    @Allow()
    lte?: string;
}

class RatingsQueryFilter {
    @IsOptional()
    @IsString()
    @Allow()
    gte?: string;
}

export class ProductFilterQueryDto {
    @IsOptional()
    @IsNumber()
    page = 1;

    @IsOptional()
    @IsString()
    keyword?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => PriceQueryFilter)
    price?: PriceQueryFilter;

    @IsOptional()
    @ValidateNested()
    @Type(() => RatingsQueryFilter)
    ratings?: RatingsQueryFilter;
}
