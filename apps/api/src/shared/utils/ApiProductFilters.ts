import mongoose, { FilterQuery, Model } from 'mongoose';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';
import ProductsApiPipelineBuilder from './ProductsApiPipelineBuilder';

interface FilteredResult<DocType> {
    products: DocType[];
    count: [{ total: number } | undefined];
}

class ProductsApi<DocType> {
    private readonly model: Model<DocType>;

    constructor(model: Model<DocType>) {
        this.model = model;
    }

    public async applyFilters(
        filterQueryBody: FilterQuery<ProductsFilterQuerySchemaType>
    ) {
        const productsApiPipelineBuilder = new ProductsApiPipelineBuilder();
        const pipeline =
            productsApiPipelineBuilder.buildAggregatePipeline(filterQueryBody);
        const [result] = await this.model
            .aggregate<FilteredResult<DocType>>(pipeline)
            .exec();
        const { products, count } = result;
        const totalFilteredCount = count[0]?.total ?? 0;
        return { products, totalFilteredCount };
    }

    public async findById(_id: mongoose.Types.ObjectId) {
        const productsApiPipelineBuilder = new ProductsApiPipelineBuilder();
        const matchPipeline = productsApiPipelineBuilder.buildMatchStage({
            _id,
        });
        const ratingStages =
            productsApiPipelineBuilder.buildLookupAndRatingStages();

        const [product] = await this.model
            .aggregate<DocType>([matchPipeline, ...ratingStages])
            .exec();
        return product;
    }
}

export default ProductsApi;
