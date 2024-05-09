import { FilterQuery, Model } from 'mongoose';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';
import ProductsApiPipelineBuilder from './ProductsApiPipelineBuilder';

class ProductsApi<
    DocType,
    FilterQueryBody extends FilterQuery<ProductsFilterQuerySchemaType> = FilterQuery<ProductsFilterQuerySchemaType>
> {
    private readonly model: Model<DocType>;

    constructor(model: Model<DocType>) {
        this.model = model;
    }

    public async applyFilters(filterQueryBody: FilterQueryBody): Promise<{
        products: DocType[];
        count: number;
    }> {
        const productsApiPipelineBuilder = new ProductsApiPipelineBuilder();
        const pipeline =
            productsApiPipelineBuilder.buildAggregatePipeline(filterQueryBody);
        const [result] = await this.model.aggregate(pipeline).exec();
        const products = result.products;
        const count =
            result.count && result.count.length > 0 ? result.count[0].total : 0;
        return { products, count };
    }

    // findByMatch(match: {}) {}
}

export default ProductsApi;
