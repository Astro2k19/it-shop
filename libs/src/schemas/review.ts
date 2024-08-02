import { z } from 'zod';

export const newReviewSchema = z.object({
    productId: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string(),
});

export type NewReviewSchemaType = z.infer<typeof newReviewSchema>;
