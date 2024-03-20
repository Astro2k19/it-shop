import catchAsyncErrors from "../shared/middlewares/catchAsyncErrors";
import User from '../model/User'
import Token from "../model/Token";
import ms from 'ms';
import ErrorHandler from "../shared/utils/ErrorHandler";
import {sendEmail} from "../shared/utils/sendEmail";
import {getResetPasswordTemplate} from "../shared/utils/getResetPasswordTemplate";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// POST => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const {name, email, password} = req.body
  // const existedUser = await User.findOne({email})
  //
  // if (existedUser) {
  //   return next(
  //     new ErrorHandler('Email is already taken', 400)
  //   )
  // }

  const user = await User.create({
    name,
    email,
    password
  })
  const token = await Token.create({user: user._id})
  const accessToken = token.getJwtAccessToken()

  res.cookie('refreshToken', token.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: ms(process.env.REFRESH_TOKEN_EXPIRE),
    sameSite: 'none'
  })
  res.status(201).json({
    accessToken
  })
})

// POST => /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const {email, password} = req.body
  const user = await User.findOne({email}).select('+password')

  if (!user) {
    return next(
      new ErrorHandler('Invalid email & password', 401)
    )
  }

  const isPassEqual = await user.comparePasswords(password)
  if (!isPassEqual) {
    return next(
      new ErrorHandler('Invalid email & password', 401)
    )
  }

  // TODO: add services for Token etc., sendToken()
  const token = await Token.create({user: user._id})
  const accessToken = token.getJwtAccessToken()
  res.cookie('refreshToken', token.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: ms(process.env.REFRESH_TOKEN_EXPIRE),
    sameSite: 'none'
  })
  res.status(201).json({
    accessToken
  })
})

// POST => /api/v1/logout

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  const {refreshToken} = req.cookies
  await Token.findOneAndDelete(refreshToken)

  res.clearCookie('refreshToken', {httpOnly: true, secure: true, sameSite: 'none'})
  res.status(200).json({
    message: 'logout'
  })
})

// POST => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const {email} = req.body
  const user = await User.findOne({email})

  if (!user) {
    return next(
      new ErrorHandler('Not found user with such email', 404)
    )
  }

  const resetToken = user.getResetPasswordToken()
  await user.save()

  const resetLink = `${process.env.CLIENT_URL}/api/v1/password/reset/${resetToken}`
  const message = getResetPasswordTemplate(user.name, resetLink)

  try {
    await sendEmail({
      to: user.email,
      subject: 'ItShop password recovery',
      message
    })
    res.json({
      message: 'A reset link has been sent to your email address'
    })
  } catch (e) {
    const error = e as Error
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    next(
      new ErrorHandler(error.message, 500)
    )
  }
})

// POST => /api/v1/password/reset
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
  const user = await User.findOne({resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }})

  if (!user) {
    return next(
      new ErrorHandler('Reset password token is inactive or has been expired', 400)
    )
  }

  if (req.body.password !== req.body.comparedPassword) {
    return next(
      new ErrorHandler('Passwords do not match', 400)
    )
  }

  user.password = req.body.password
  await user.save()

  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  // TODO: add services for Token etc., sendToken()
  const token = await Token.create({user: user._id})
  const accessToken = token.getJwtAccessToken()
  res.cookie('refreshToken', token.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: ms(process.env.REFRESH_TOKEN_EXPIRE),
    sameSite: 'none'
  })
  res.status(201).json({
    accessToken
  })
})

// POST => /api/v1/password/reset
export const getUserDetails = catchAsyncErrors((req, res) => {
  const user = req.user
  res.json({
    user
  })
})


export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password')
  const isPasswordMatched = await user.comparePasswords(req.body.oldPassword)

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler('Old password is invalid', 400)
    )
  }

  user.password = req.body.password
  user.save()

  res.json({
    success: true
  })
})


