import mongoose, {Document} from "mongoose";

export interface ProductModel extends Document {
  user?: mongoose.Schema.Types.ObjectId
  name: string
  description: string
  price: number
  category: ProductCategories
  stock: number
  seller: string
  images: ProductImage[]
  ratings: number
  createdAt: mongoose.Schema.Types.Date
  updatedAt: mongoose.Schema.Types.Date
}

export interface ProductImage {
  public_id: string,
  url: string
}

export type ProductCategories = "Electronics" | "Cameras" | "Laptops" | "Accessories" | "Headphones" | "Food" | "Books" | "Sports" | "Outdoor" | "Home"
