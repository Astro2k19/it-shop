import { Prisma } from '@prisma/client';
import { ProductFilterQueryDto } from '@it-shop/dtos';

export const transformFilterDtoToPrisma = (
    filterProductDto: ProductFilterQueryDto
): Prisma.ProductWhereInput => {
    const filter: Prisma.ProductWhereInput = {};
    if (filterProductDto.keyword) {
        filter.OR = [
            {
                name: {
                    contains: filterProductDto.keyword,
                    mode: 'insensitive',
                },
            },
            {
                description: {
                    contains: filterProductDto.keyword,
                    mode: 'insensitive',
                },
            },
        ];
    }

    if (filterProductDto.category) {
        filter.category = {
            contains: filterProductDto.category,
            mode: 'insensitive',
        };
    }

    if (filterProductDto.price) {
        filter.price = {};
        if (filterProductDto.price.gte) {
            filter.price.gte = parseFloat(filterProductDto.price.gte);
        }
        if (filterProductDto.price.lte) {
            filter.price.lte = parseFloat(filterProductDto.price.lte);
        }
    }

    if (filterProductDto.ratings && filterProductDto.ratings.gte) {
        filter.ratings = {};
        filter.ratings.gte = parseFloat(filterProductDto.ratings.gte);
    }

    return filter;
};
