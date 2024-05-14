import { PipelineStage } from 'mongoose';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';

class PaginationStageBuilder {
    public readonly resPerPage: number;

    constructor(resPerPage: number) {
        this.resPerPage = resPerPage;
    }

    public build(
        filterQueryBody: ProductsFilterQuerySchemaType
    ): PipelineStage[] {
        const { page = 1 } = filterQueryBody;
        const currentPage = Number(page);
        const skip = this.resPerPage * (currentPage - 1);
        return [{ $skip: skip }, { $limit: this.resPerPage }];
    }
}

export default PaginationStageBuilder;
