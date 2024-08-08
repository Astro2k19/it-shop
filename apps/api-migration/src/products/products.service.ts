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
    private readonly resPerPage = 4;
    constructor(private readonly prismaService: PrismaService) {}

    async findMany(query: ProductFilterQueryDto) {
        const filter = transformFilterDtoToPrisma(query);
        const args = {
            skip: this.resPerPage * (query.page - 1),
            take: this.resPerPage,
            where: filter,
        };
        const [count, products] = await this.prismaService.$transaction([
            this.prismaService.product.count(args),
            this.prismaService.product.findMany(args),
        ]);
        return {
            count,
            products,
            resPerPage: this.resPerPage,
        };
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
