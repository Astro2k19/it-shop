import { PipelineStage } from 'mongoose';
import { ProductsFilterQuerySchemaTypeExtended } from './ProductsApiPipelineBuilder';

class MatchStageBuilder {
    public build(
        filterQueryBody: ProductsFilterQuerySchemaTypeExtended
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
}

export default MatchStageBuilder;
