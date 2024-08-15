import { ImageDto } from '../image';

export class ProductDto {
    id: string;
    category: string;
    description: string;
    images: ImageDto[];
    name: string;
    price: number;
    seller: string;
    stock: number;
    updatedAt: Date;
    createdAt: Date;
}
