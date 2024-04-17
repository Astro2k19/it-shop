import { Model, Query } from 'mongoose';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';

class ApiFilters<
    DocType,
    FilterQueryBody extends ProductsFilterQuerySchemaType = ProductsFilterQuerySchemaType
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
        let keywordFilter = {};

        if (this.queryString.keyword) {
            keywordFilter = {
                name: {
                    $regex: this.queryString.keyword,
                    $options: 'i',
                },
            };
        }

        this.query = (this.query as Model<DocType>)
            .find(keywordFilter)
            .populate('reviews')
            .lean() as Query<DocType[], DocType>;
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
        this.query = (this.query as Query<DocType[], DocType>)
            .find(JSON.parse(queryString))
            .populate('reviews')
            .lean() as Query<DocType[], DocType>;
        return this;
    }

    paginate(resPerPage: number) {
        if (!(this.query instanceof Query)) {
            return this;
        }

        const currentPage = Number(this.queryString.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query
            .limit(resPerPage)
            .skip(skip)
            .populate('reviews')
            .lean() as Query<DocType[], DocType>;
        return this;
    }
}

export default ApiFilters;
