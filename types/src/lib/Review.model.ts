import mongoose, {Document} from "mongoose";

export interface ReviewModel extends Document {
  product: mongoose.Schema.Types.ObjectId
  numOfReviews: number
  reviews: ReviewItem[]
}

export interface ReviewItem {
  user: mongoose.Schema.Types.ObjectId
  comment: string
  rating: string
}
