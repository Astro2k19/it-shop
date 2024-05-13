import { FilterQuery, PipelineStage } from 'mongoose';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';

class ProductsApiPipelineBuilder {
    private readonly resPerPage = 4;

    public buildAggregatePipeline(
        filterQueryBody: FilterQuery<ProductsFilterQuerySchemaType>
    ): PipelineStage[] {
        const countPipeline = this.buildCountPipeline();
        const paginationStage = this.buildPaginationStages(filterQueryBody);

        const productsPipeline = this.buildProductsPipeline(filterQueryBody);

        const facetStage = {
            $facet: {
                products: paginationStage,
                count: countPipeline,
            },
        } as PipelineStage;

        return [...productsPipeline, facetStage];
    }

    public buildProductsPipeline(
        filterQueryBody: FilterQuery<ProductsFilterQuerySchemaType>
    ): PipelineStage[] {
        return [
            this.buildMatchStage(filterQueryBody),
            ...this.buildLookupAndRatingStages(filterQueryBody),
        ];
    }

    public buildCountPipeline(): PipelineStage[] {
        return [{ $count: 'total' }];
    }

    public buildMatchStage(
        filterQueryBody: FilterQuery<ProductsFilterQuerySchemaType>
    ): PipelineStage {
        const matchConditions: Record<string, any> = {};

        if (filterQueryBody.keyword) {
            matchConditions.name = {
                $regex: filterQueryBody.keyword,
                $options: 'i',
            };
        }

        if (filterQueryBody.category) {
            matchConditions.category = filterQueryBody.category;
        }

        if (filterQueryBody.price?.gte) {
            matchConditions.price = {
                ...matchConditions.price,
                $gte: parseFloat(filterQueryBody.price.gte),
            };
        }

        if (filterQueryBody.price?.lte) {
            matchConditions.price = {
                ...matchConditions.price,
                $lte: parseFloat(filterQueryBody.price.lte),
            };
        }

        if (filterQueryBody._id) {
            matchConditions._id = filterQueryBody._id;
        }

        return { $match: matchConditions };
    }

    public buildLookupAndRatingStages(
        filterQueryBody?: FilterQuery<ProductsFilterQuerySchemaType>
    ): PipelineStage[] {
        const stages: PipelineStage[] = [
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'product',
                    as: 'reviews',
                },
            },
            {
                $addFields: {
                    averageRating: {
                        $cond: {
                            if: { $gt: [{ $size: '$reviews' }, 0] },
                            then: { $avg: '$reviews.rating' },
                            else: 0,
                        },
                    },
                },
            },
        ];

        if (filterQueryBody?.ratings?.gte) {
            stages.push({
                $match: {
                    averageRating: {
                        $gte: parseFloat(filterQueryBody.ratings.gte),
                    },
                },
            });
        }

        return stages;
    }

    public buildPaginationStages(
        filterQueryBody: FilterQuery<ProductsFilterQuerySchemaType>
    ): PipelineStage[] {
        const { page = 1 } = filterQueryBody;
        const currentPage = Number(page);
        const skip = this.resPerPage * (currentPage - 1);
        return [{ $skip: skip }, { $limit: this.resPerPage }];
    }
}

export default ProductsApiPipelineBuilder;
