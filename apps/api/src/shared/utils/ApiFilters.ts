import { Model, Query } from 'mongoose';
import { ProductQueryFilterSchema } from '@it-shop/types';

class ApiFilters<
    DocType,
    FilterQueryBody extends ProductQueryFilterSchema = ProductQueryFilterSchema
> {
    query: Model<DocType> | Query<DocType[], DocType>;
    queryString: FilterQueryBody;

    constructor(
        query: Model<DocType> | Query<DocType[], DocType>,
        queryString: FilterQueryBody
    ) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keywordFilter = this.queryString.keyword
            ? {
                  name: {
                      $regex: this.queryString.keyword,
                      $options: 'i',
                  },
              }
            : {};

        // @ts-expect-error: test
        this.query = (this.query as Model<DocType>)
            .find(keywordFilter)
            .populate('reviews')
            .lean();
        return this;
    }

    filter() {
        const queryStringCopy = { ...this.queryString };

        const fieldsToExclude = ['keyword', 'page'];
        fieldsToExclude.forEach((field) => delete queryStringCopy[field]);

        let queryString = JSON.stringify(queryStringCopy);
        queryString = queryString.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );
        // @ts-expect-error: test
        this.query = (this.query as Query<DocType[], DocType>)
            .find(JSON.parse(queryString))
            .populate('reviews')
            .lean();
        return this;
    }

    paginate(resPerPage: number) {
        if (!(this.query instanceof Query)) {
            return this;
        }

        const currentPage = Number(this.queryString.page) || 1;
        const skip = currentPage * (currentPage - 1);
        // @ts-expect-error: test
        this.query = this.query
            .limit(resPerPage)
            .populate('reviews')
            .skip(skip)
            .lean();
        return this;
    }
}

export default ApiFilters;
