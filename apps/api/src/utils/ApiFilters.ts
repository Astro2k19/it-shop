import {Document, type FilterQuery, Model, Query} from "mongoose";

class ApiFilters<DocType extends Document> {
    query: Model<DocType> | Query<DocType[], DocType>
    queryString: FilterQuery<DocType>;

    constructor(query: Model<DocType> | Query<DocType[], DocType>, queryString: FilterQuery<DocType>) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keywordFilter = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {};

        this.query = (this.query as Model<DocType>).find(keywordFilter);

        return this;
    }

    filter() {
        const queryStringCopy = {...this.queryString}

        const fieldsToExclude = ['keyword', 'page']
        fieldsToExclude.forEach(field => delete queryStringCopy[field])

        let queryString = JSON.stringify(queryStringCopy)
        queryString = queryString.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        )

        this.query = (this.query as Query<DocType[], DocType>).find(JSON.parse(queryString));
        return this
    }

    paginate(resPerPage: number) {
        if (!(this.query instanceof Query)) {
            return this
        }

        const currentPage = this.queryString.page || 1
        const skip = currentPage * (currentPage - 1)

        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}

export default ApiFilters;
