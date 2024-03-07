import mongoose, {Document} from "mongoose";

export interface TokenModel extends Document {
  user: mongoose.Schema.Types.ObjectId
  refreshToken: string
}
