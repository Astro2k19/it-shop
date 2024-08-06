import { Injectable } from '@nestjs/common';
import { transformFilterDtoToPrisma } from './utils/transform-filter';
import {
    CreateProductDto,
    ProductFilterQueryDto,
    UpdateProductDto,
} from '@it-shop/dtos';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
    private readonly take = 4;
    constructor(private readonly prismaService: PrismaService) {}

    findMany(query: ProductFilterQueryDto) {
        const filter = transformFilterDtoToPrisma(query);
        return this.prismaService.product.findMany({
            skip: this.take * (query.page - 1),
            take: this.take,
            where: filter,
        });
    }

    getById(id: string) {
        return this.prismaService.product.findUnique({
            where: { id },
        });
    }

    update(id: string, updateProductDto: UpdateProductDto) {
        return this.prismaService.product.update({
            where: { id },
            data: updateProductDto,
        });
    }

    create(createProductDto: CreateProductDto, user: Prisma.UserCreateInput) {
        return this.prismaService.product.create({
            data: {
                ...createProductDto,
                userId: user.id,
            },
        });
    }

    delete(id: string) {
        return this.prismaService.product.delete({
            where: { id },
        });
    }
}
