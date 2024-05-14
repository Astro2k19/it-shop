import mongoose, { PipelineStage } from 'mongoose';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';
import MatchStageBuilder from './MatchStageBuilder';
import LookupStageBuilder from './LookupStageBuilder';
import PaginationStageBuilder from './PaginationStageBuilder';

export interface ProductsFilterQuerySchemaTypeExtended
    extends ProductsFilterQuerySchemaType {
    _id?: mongoose.Types.ObjectId;
}

class ProductsApiPipelineBuilder {
    private readonly matchStageBuilder: MatchStageBuilder;
    private readonly lookupStageBuilder: LookupStageBuilder;
    private readonly paginationStageBuilder: PaginationStageBuilder;

    constructor(
        matchStageBuilder: MatchStageBuilder,
        lookupStageBuilder: LookupStageBuilder,
        paginationStageBuilder: PaginationStageBuilder
    ) {
        this.matchStageBuilder = matchStageBuilder;
        this.lookupStageBuilder = lookupStageBuilder;
        this.paginationStageBuilder = paginationStageBuilder;
    }

    public buildAggregatePipeline(
        filterQueryBody: ProductsFilterQuerySchemaTypeExtended
    ): PipelineStage[] {
        const paginationStage =
            this.paginationStageBuilder.build(filterQueryBody);

        const productsPipeline = this.buildProductsPipeline(filterQueryBody);

        const facetStage = {
            $facet: {
                products: paginationStage,
                count: [{ $count: 'total' }],
            },
        } as PipelineStage;

        return [...productsPipeline, facetStage];
    }

    public buildProductsPipeline(
        filterQueryBody: ProductsFilterQuerySchemaTypeExtended
    ): PipelineStage[] {
        return [
            this.matchStageBuilder.build(filterQueryBody),
            ...this.lookupStageBuilder.build(filterQueryBody),
        ];
    }
}

export default ProductsApiPipelineBuilder;
