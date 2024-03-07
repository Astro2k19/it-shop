import mongoose, {HydratedDocument} from "mongoose";
import jwt from 'jsonwebtoken'
import {TokenModel} from "@it-shop/types";

interface TokenModelMethods {
  getJwtRefreshToken: () => string
  getJwtAccessToken: () => string
}

type HydratedToken = HydratedDocument<TokenModel, TokenModelMethods>;

const Token = new mongoose.Schema<HydratedToken>({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  refreshToken: String
})

Token.pre('save',  function (next) {
  if (this.refreshToken) {
    console.log(this.refreshToken, 'this.refreshToken already exist')
  }
  this.refreshToken = this.getJwtRefreshToken()
  next()
})

Token.methods.getJwtRefreshToken = function () {
  return jwt.sign({id: this.user}, process.env.SECRET_REFRESH_TOKEN, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE
  })
}

Token.methods.getJwtAccessToken = function () {
  return jwt.sign({id: this.user}, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE
  })
}

export default mongoose.model('token', Token)
