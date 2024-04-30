import { Model, PipelineStage } from 'mongoose';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';

class ApiProductFilters<
    DocType,
    FilterQueryBody extends ProductsFilterQuerySchemaType = ProductsFilterQuerySchemaType
> {
    query: Model<DocType>;
    queryString: FilterQueryBody;
    pipeline: PipelineStage[];

    constructor(query: Model<DocType>, queryString: FilterQueryBody) {
        this.query = query;
        this.queryString = queryString;
        this.pipeline = [];
    }

    applyFilters() {
        this.matchKeyword();
        this.addCategoryFilterToPipeline();
        this.addPriceFiltersToPipeline();
        this.addRatingFilterToPipeline();
        this.paginateResults();

        return this.query.aggregate(this.pipeline).exec();
    }

    matchKeyword() {
        const { keyword } = this.queryString;
        if (keyword) {
            this.pipeline.push({
                $match: { name: { $regex: keyword, $options: 'i' } },
            });
        }
    }

    addCategoryFilterToPipeline() {
        const { category } = this.queryString;
        if (category) {
            this.pipeline.push({ $match: { category } });
        }
    }

    addPriceFiltersToPipeline() {
        const { 'price[gte]': priceGte, 'price[lte]': priceLte } =
            this.queryString;
        if (priceGte) {
            this.pipeline.push({
                $match: { price: { $gte: parseFloat(priceGte) } },
            });
        }
        if (priceLte) {
            this.pipeline.push({
                $match: { price: { $lte: parseFloat(priceLte) } },
            });
        }
    }

    addRatingFilterToPipeline() {
        const { 'ratings[gte]': ratingsGte } = this.queryString;
        console.log(this.queryString, 'this.queryString');

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
        console.log(ratingsGte, 'ratingsGte');
        console.log(ratingsGte, "{ ratings: { gte: '2' } } this.queryString");
        if (ratingsGte) {
            this.pipeline.push({
                $match: { averageRating: { $gte: parseFloat(ratingsGte) } },
            });
        }
    }

    paginateResults() {
        const { page = 1 } = this.queryString;
        const resPerPage = 4;
        const currentPage = Number(page);
        const skip = resPerPage * (currentPage - 1);
        this.pipeline.push({ $skip: skip }, { $limit: resPerPage });
    }
}

export default ApiProductFilters;
