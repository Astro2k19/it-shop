import {
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
    IsPositive,
    Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class PriceQueryFilter {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => Number(value))
    gte?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => Number(value))
    lte?: string;
}

class RatingsQueryFilter {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => Number(value))
    gte?: string;
}

export class ProductFilterQueryDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => Number(value))
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
