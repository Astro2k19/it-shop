import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
    CreateProductDto,
    ProductFilterQueryDto,
    UpdateProductDto,
} from '@it-shop/dtos';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    getMany(@Query() query: ProductFilterQueryDto) {
        return this.productsService.findMany(query);
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto, @Req() req) {
        return this.productsService.create(createProductDto, req.user);
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.productsService.getById(id);
    }

    @Post(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.productsService.delete(id);
    }
}
