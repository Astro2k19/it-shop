import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { ProductsService } from '@/app/products/products.service';
import { CreateProductDto, UpdateProductDto } from '@it-shop/dtos';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getMany(@Query() query) {
        return this.productsService.findMany();
    }

    @Post()
    create(createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }
    @Get()
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.getById(id);
    }

    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productsService.update(id, updateProductDto);
    }

    deleteById(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.delete(id);
    }
}
