import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
    CreateProductDto,
    ProductFilterQueryDto,
    UpdateProductDto,
} from '@it-shop/dtos';
import { AccessTokenGuard } from '../auth/access-token-guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoles } from '../auth/roles.enum';
import { Roles } from '@/auth/roles.decorator';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    findMany(@Query() query: ProductFilterQueryDto) {
        return this.productsService.findMany(query);
    }

    @UseGuards(RolesGuard)
    @UseGuards(AccessTokenGuard)
    @Roles(UserRoles.Admin)
    @Post()
    create(@Body() createProductDto: CreateProductDto, @Req() req) {
        console.log(req.user, 'req.user');
        return this.productsService.create(createProductDto, req.user);
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.productsService.getById(id);
    }

    @UseGuards(RolesGuard)
    @UseGuards(AccessTokenGuard)
    @Roles(UserRoles.Admin)
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productsService.update(id, updateProductDto);
    }

    @UseGuards(RolesGuard)
    @UseGuards(AccessTokenGuard)
    @Roles(UserRoles.Admin)
    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.productsService.delete(id);
    }
}
