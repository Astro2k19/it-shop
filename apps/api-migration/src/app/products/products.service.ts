import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '@it-shop/dtos';

@Injectable()
export class ProductsService {
    findMany() {}

    getById(id: number) {}

    update(id: number, updateProductDto: UpdateProductDto) {}

    create(createProductDto: CreateProductDto) {}

    delete(id: number) {}
}
