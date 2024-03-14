import catchAsyncErrors from "../shared/middlewares/catchAsyncErrors";
import User from '../model/User'
import Token from "../model/Token";
import ms from 'ms';
import ErrorHandler from "../shared/utils/ErrorHandler";
import {sendEmail} from "../shared/utils/sendEmail";
import {getResetPasswordTemplate} from "../shared/utils/getResetPasswordTemplate";

// POST => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const {name, email, password} = req.body
  const existedUser = await User.findOne({email})

  if (existedUser) {
    return next(
      new ErrorHandler('Email is already taken', 400)
    )
  }

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

  // TODO: add sercives for Token etc., sendToken()
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

// POST => /api/v1/login
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
    console.log('error', e)
    next(
      new ErrorHandler(error.message, 500)
    )
  }
})


