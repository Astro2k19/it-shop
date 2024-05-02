import { Model, Document, Aggregate } from 'mongoose';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';

class ApiProductFilters<
    DocType extends Document,
    FilterQueryBody extends ProductsFilterQuerySchemaType = ProductsFilterQuerySchemaType
> {
    query: Model<DocType>;
    queryString: FilterQueryBody;

    constructor(query: Model<DocType>, queryString: FilterQueryBody) {
        this.query = query;
        this.queryString = queryString;
    }

    async applyFilters(): Promise<{ products: DocType[]; count: number }> {
        const pipeline = this.buildPipeline();
        const aggregationResult = await this.query.aggregate(pipeline).exec();
        const [products, count] =
            this.extractProductsAndCount(aggregationResult);
        return { products, count };
    }

    private buildPipeline(): any[] {
        const pipeline: any[] = [];
        this.matchKeyword(pipeline);
        this.addCategoryFilterToPipeline(pipeline);
        this.addPriceFiltersToPipeline(pipeline);
        this.addRatingFilterToPipeline(pipeline);
        this.paginateResults(pipeline);
        this.addTotalCountStage(pipeline);
        return pipeline;
    }

    private matchKeyword(pipeline: any[]): void {
        const { keyword } = this.queryString;
        if (keyword) {
            pipeline.push({
                $match: { name: { $regex: keyword, $options: 'i' } },
            });
        }
    }

    private addCategoryFilterToPipeline(pipeline: any[]): void {
        const { category } = this.queryString;
        if (category) {
            pipeline.push({ $match: { category } });
        }
    }

    private addPriceFiltersToPipeline(pipeline: any[]): void {
        const price = this.queryString.price;
        if (price?.gte) {
            pipeline.push({
                $match: { price: { $gte: parseFloat(price.gte) } },
            });
        }
        if (price?.lte) {
            pipeline.push({
                $match: { price: { $lte: parseFloat(price.lte) } },
            });
        }
    }

    private addRatingFilterToPipeline(pipeline: any[]): void {
        const ratings = this.queryString.ratings;
        if (ratings?.gte) {
            pipeline.push({
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'product',
                    as: 'reviews',
                },
            });
            pipeline.push({
                $addFields: {
                    averageRating: {
                        $avg: { $ifNull: ['$reviews.rating', 0] },
                    },
                },
            });
            pipeline.push({
                $match: { averageRating: { $gte: parseFloat(ratings.gte) } },
            });
        }
    }

    private paginateResults(pipeline: any[]): void {
        const { page = 1 } = this.queryString;
        const resPerPage = 4;
        const currentPage = Number(page);
        const skip = resPerPage * (currentPage - 1);
        pipeline.push({ $skip: skip }, { $limit: resPerPage });
    }

    private addTotalCountStage(pipeline: any[]): void {
        pipeline.push({ $group: { _id: null, count: { $sum: 1 } } });
    }

    private extractProductsAndCount(
        aggregationResult: any[]
    ): [DocType[], number] {
        const products = aggregationResult.slice(0, -1); // Exclude the last element (total count)
        const count =
            aggregationResult.length > 0
                ? aggregationResult[aggregationResult.length - 1].count
                : 0;
        return [products, count];
    }
}

export default ApiProductFilters;
