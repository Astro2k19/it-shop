import { PipelineStage } from 'mongoose';
import { ProductsFilterQuerySchemaType } from '@it-shop/schemas';

class LookupStageBuilder {
    public build(
        filterQueryBody?: ProductsFilterQuerySchemaType
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
}
export default LookupStageBuilder;
