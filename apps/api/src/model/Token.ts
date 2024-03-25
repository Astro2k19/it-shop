import mongoose from "mongoose";
import {TokenModel} from "@it-shop/types";

const Token = new mongoose.Schema<TokenModel>({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  refreshToken: String
})

export default mongoose.model('token', Token)
