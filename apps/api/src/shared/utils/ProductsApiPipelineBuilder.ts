import { FilterQuery, PipelineStage } from 'mongoose';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';

class ProductsApiPipelineBuilder<
    FilterQueryBody extends FilterQuery<ProductsFilterQuerySchemaType> = FilterQuery<ProductsFilterQuerySchemaType>
> {
    private readonly resPerPage = 4;

    public buildAggregatePipeline(
        filterQueryBody: FilterQueryBody
    ): PipelineStage[] {
        const aggregatePipeline: PipelineStage[] = [];

        aggregatePipeline.push(...this.buildProductsPipeline(filterQueryBody), {
            $facet: {
                // @ts-expect-error: test
                products: this.addPaginationStages(filterQueryBody),
                // @ts-expect-error: test
                count: this.addTotalCountStages(),
            },
        });

        return aggregatePipeline;
    }

    private buildProductsPipeline(
        filterQueryBody: FilterQueryBody
    ): PipelineStage[] {
        const productsPipeline: Array<PipelineStage | Record<never, never>> = [
            this.addKeywordMatchStage(filterQueryBody),
            this.addCategoryFilterStage(filterQueryBody),
            this.addPriceFilterStages(filterQueryBody),
            this.addRatingFilterStages(filterQueryBody),
        ];

        return productsPipeline as PipelineStage[];
    }

    private addTotalCountStages() {
        return {
            $count: 'count',
        };
    }

    private addKeywordMatchStage(filterQueryBody: FilterQueryBody) {
        const { keyword } = filterQueryBody;
        if (keyword) {
            return {
                $match: { name: { $regex: keyword, $options: 'i' } },
            };
        }
    }

    private addCategoryFilterStage(filterQueryBody: FilterQueryBody) {
        const { category } = filterQueryBody;
        if (category) {
            return { $match: { category } };
        }
    }

    private addPriceFilterStages(filterQueryBody: FilterQueryBody) {
        const price = filterQueryBody.price;
        const priceStage: PipelineStage | Record<never, never> = {};

        if (price?.gte) {
            Object.assign(priceStage, {
                $match: { price: { $gte: parseFloat(price.gte) } },
            });
        }

        if (price?.lte) {
            Object.assign(priceStage, {
                $match: { price: { $lte: parseFloat(price.lte) } },
            });
        }

        return priceStage;
    }

    private addRatingFilterStages(filterQueryBody: FilterQueryBody) {
        const ratings = filterQueryBody.ratings;
        const ratingsStage: Record<never, never> = {};

        Object.assign(ratingsStage, {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'product',
                as: 'reviews',
            },
            $addFields: {
                averageRating: {
                    $cond: {
                        if: { $gt: [{ $size: '$reviews' }, 0] },
                        then: { $avg: '$reviews.rating' },
                        else: 0,
                    },
                },
            },
        });

        if (ratings?.gte) {
            Object.assign(ratingsStage, {
                $match: { averageRating: { $gte: parseFloat(ratings.gte) } },
            });
        }
        return ratingsStage;
    }

    private addPaginationStages(filterQueryBody: FilterQueryBody) {
        const { page = 1 } = filterQueryBody;
        const currentPage = Number(page);
        const skip = this.resPerPage * (currentPage - 1);
        return { $skip: skip, $limit: this.resPerPage };
    }
}

export default ProductsApiPipelineBuilder;
