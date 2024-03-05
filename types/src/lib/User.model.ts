import mongoose, {Document} from "mongoose";

export interface UserModel extends Document {
  name: string
  email: string
  password: string
  avatar: {
    public_id: string
    url: string
  }
  role: string
  resetPasswordToken: string
  resetPasswordExpire: mongoose.Schema.Types.Date
  createdAt: mongoose.Schema.Types.Date
  updatedAt: mongoose.Schema.Types.Date
}
