import { FilterQuery, Model, PipelineStage } from 'mongoose';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';

class ApiProductFilters<
    DocType,
    FilterQueryBody extends FilterQuery<ProductsFilterQuerySchemaType> = FilterQuery<ProductsFilterQuerySchemaType>
> {
    readonly query: Model<DocType>;
    readonly filterQueryBody: FilterQueryBody;
    readonly pipeline: PipelineStage[];
    readonly resPerPage = 4;

    constructor(query: Model<DocType>, filterQueryBody: FilterQueryBody) {
        this.query = query;
        this.filterQueryBody = filterQueryBody;
        this.pipeline = [];
    }

    public async applyFilters(): Promise<{
        products: DocType[];
        count: number;
    }> {
        this.buildPipeline();
        const [products, count] = await Promise.all([
            this.query.aggregate(this.pipeline).exec(),
            this.getTotalCount(),
        ]);
        return { products, count };
    }

    private buildPipeline() {
        this.matchKeyword();
        this.addCategoryFilterToPipeline();
        this.addPriceFiltersToPipeline();
        this.addRatingFilterToPipeline();
        this.paginateResults();
    }

    private async getTotalCount(): Promise<number> {
        const countPipeline: PipelineStage[] = [...this.pipeline];
        // Remove $skip and $limit stages from the pipeline
        countPipeline.pop(); // Remove $limit
        countPipeline.pop(); // Remove $skip
        countPipeline.push({ $count: 'total' });
        const result = await this.query.aggregate(countPipeline).exec();
        return result.length > 0 ? result[0].total : 0;
    }

    private matchKeyword() {
        const { keyword } = this.filterQueryBody;
        if (keyword) {
            this.pipeline.push({
                $match: { name: { $regex: keyword, $options: 'i' } },
            });
        }
    }

    private addCategoryFilterToPipeline() {
        const { category } = this.filterQueryBody;
        if (category) {
            this.pipeline.push({ $match: { category } });
        }
    }

    private addPriceFiltersToPipeline() {
        const price = this.filterQueryBody.price;

        if (price?.gte) {
            this.pipeline.push({
                $match: { price: { $gte: parseFloat(price.gte) } },
            });
        }

        if (price?.lte) {
            this.pipeline.push({
                $match: { price: { $gte: parseFloat(price.lte) } },
            });
        }
    }

    public addRatingFilterToPipeline() {
        const ratings = this.filterQueryBody.ratings;

        this.pipeline.push({
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'product',
                as: 'reviews',
            },
        });

        this.pipeline.push({
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
            this.pipeline.push({
                $match: { averageRating: { $gte: parseFloat(ratings.gte) } },
            });
        }
    }

    private paginateResults() {
        const { page = 1 } = this.filterQueryBody;
        const currentPage = Number(page);
        const skip = this.resPerPage * (currentPage - 1);
        this.pipeline.push({ $skip: skip }, { $limit: this.resPerPage });
    }
}

export default ApiProductFilters;
