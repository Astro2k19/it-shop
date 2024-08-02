import { ProductImageDto } from '../product-image/product-image.dto';

export class ProductDto {
    id: string;
    category: string;
    description: string;
    images: ProductImageDto[];
    name: string;
    price: number;
    seller: string;
    stock: number;
    updatedAt: Date;
    createdAt: Date;
}
