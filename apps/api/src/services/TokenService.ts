import ms from "ms";
import Token from "../model/Token";
import mongoose from "mongoose";
import {Response} from "express";
import JWTRedis from "jwt-redis";
import {createClient} from 'redis'
import {RedisClientType} from 'redis'

class TokenService {
  private static instance: TokenService;
  readonly jwt: JWTRedis

  private constructor(redisClient: RedisClientType) {
    this.jwt = new JWTRedis(redisClient)
  }

  static async getInstance() {
    if (!TokenService.instance) {
      const redisClient = await TokenService.initRedisClient()
      // @ts-expect-error: redisClient type error
      TokenService.instance = new TokenService(redisClient)
    }

    return TokenService.instance
  }

  static async initRedisClient() {
    const redisClient = createClient()
    console.log('client')
    await redisClient.connect()
    console.log('connect')
    return redisClient
  }

  async getJwtTokens(id: number) {
    const accessToken = await this.getJwtAccessToken(id);
    const refreshToken = await this.getJwtRefreshToken(id);

    return {
      accessToken,
      refreshToken
    }
  }

  async getJwtRefreshToken(id: number) {
    return this.jwt.sign({id, jti: String(id)}, process.env.SECRET_REFRESH_TOKEN, {
      expiresIn: ms(process.env.REFRESH_TOKEN_EXPIRE)
    });
  }

  async getJwtAccessToken(id: number) {
    return this.jwt.sign({id, jti: String(id)}, process.env.SECRET_ACCESS_TOKEN, {
      expiresIn: ms(process.env.ACCESS_TOKEN_EXPIRE)
    });
  }

  async destroyJwtToken(identifier: string) {
    await this.jwt.destroy(identifier)
  }

  async verifyAccessToken(token: string) {
    return this.jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
  }

  async verifyRefreshToken(token: string) {
    return this.jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
  }

  async saveRefreshToken(userId: mongoose.Schema.Types.ObjectId, token: string) {
    const existedToken = await Token.findOne({user: userId});

    if (existedToken) {
      existedToken.refreshToken = token;
      return existedToken.save();
    }

    await Token.create({user: userId, refreshToken: token});
  }

  sendTokens(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: ms(process.env.REFRESH_TOKEN_EXPIRE),
      sameSite: 'none'
    });
    res.status(201).json({
      accessToken
    });
  }

  async clearRefreshToken(res: Response, refreshToken: string) {
    await this.removeToken(refreshToken);
    res.clearCookie('refreshToken', {httpOnly: true, secure: true, sameSite: 'none'});
  }

  async removeToken(refreshToken: string) {
    return Token.deleteOne({refreshToken});
  }

  async findToken(refreshToken: string) {
    return Token.findOne({refreshToken});
  }
}

export default TokenService;

