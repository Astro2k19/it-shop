import mongoose, { Model } from 'mongoose';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';
import ProductsApiPipelineBuilder from './ProductsApiPipelineBuilder';
import { Product } from '@it-shop/types';
import MatchStageBuilder from './MatchStageBuilder';
import LookupStageBuilder from './LookupStageBuilder';
import PaginationStageBuilder from './PaginationStageBuilder';

interface FilteredResult<DocType extends Product> {
    products: DocType[];
    count: [{ total: number }] | [];
}

class ProductsApi<DocType extends Product> {
    private readonly model: Model<DocType>;
    private readonly pipelineBuilder: ProductsApiPipelineBuilder;
    constructor(
        model: Model<DocType>,
        matchStageBuilder: MatchStageBuilder,
        lookupStageBuilder: LookupStageBuilder,
        paginationStageBuilder: PaginationStageBuilder
    ) {
        this.model = model;
        this.pipelineBuilder = new ProductsApiPipelineBuilder(
            matchStageBuilder,
            lookupStageBuilder,
            paginationStageBuilder
        );
    }

    public async applyFilters(filterQueryBody: ProductsFilterQuerySchemaType) {
        const pipeline =
            this.pipelineBuilder.buildAggregatePipeline(filterQueryBody);
        const [result] = await this.model
            .aggregate<FilteredResult<DocType>>(pipeline)
            .exec();
        const { products, count } = result;
        const totalCount = count[0]?.total ?? 0;
        return { products, totalCount };
    }

    public async findById(_id: mongoose.Types.ObjectId) {
        const matchStageBuilder = new MatchStageBuilder();
        const lookupStageBuilder = new LookupStageBuilder();

        const matchPipeline = matchStageBuilder.build({
            _id,
        });
        const ratingStages = lookupStageBuilder.build();
        const pipeline = [matchPipeline, ...ratingStages];

        const [product] = await this.model.aggregate<DocType>(pipeline).exec();
        return product;
    }
}

export default ProductsApi;
