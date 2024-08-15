import {Inject, Injectable} from '@nestjs/common';
import { transformFilterDtoToPrisma } from './utils/transform-filter';
import {
    CreateProductDto,
    ProductFilterQueryDto,
    UpdateProductDto,
} from '@it-shop/dtos';
import {CustomPrismaService} from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import {ExtendedPrismaClient} from "@/prisma/prisma.extension";

@Injectable()
export class ProductsService {
    private readonly resPerPage = 4;
    constructor(
      @Inject('PrismaService')
      private prismaService: CustomPrismaService<ExtendedPrismaClient>
    ) {}

    async findMany(query: ProductFilterQueryDto) {
        const filter = transformFilterDtoToPrisma(query);
        const args = {
            skip: this.resPerPage * (query.page - 1),
            take: this.resPerPage,
            where: filter,
        };
        const [count, products] = await this.prismaService.client.$transaction([
            this.prismaService.client.product.count(args),
            this.prismaService.client.product.findMany(args),
        ]);
        return {
            count,
            products,
            resPerPage: this.resPerPage,
        };
    }

    getById(id: string) {
        return this.prismaService.client.product.findUnique({
            where: { id },
        });
    }

    update(id: string, updateProductDto: UpdateProductDto) {
        return this.prismaService.client.product.update({
            where: { id },
            data: updateProductDto,
        });
    }

    create(createProductDto: CreateProductDto, user: Prisma.UserCreateInput) {
        return this.prismaService.client.product.create({
            data: {
                ...createProductDto,
                userId: user.id,
            },
        });
    }

    delete(id: string) {
        return this.prismaService.client.product.delete({
            where: { id },
        });
    }
}
