import {ReviewItem, ReviewModel} from "@it-shop/types";

export const updateProductReviewsRating = (reviewModel: ReviewModel, updatedReviews: ReviewItem[]) => {
  reviewModel.numOfReviews = updatedReviews.length
  if (updatedReviews.length === 0) {
    reviewModel.ratings = 0
  } else {
    reviewModel.ratings = updatedReviews.reduce(
      (acc, review) => acc + review.rating , 0
    ) / updatedReviews.length
  }
}
