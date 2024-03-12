import catchAsyncErrors from "../shared/middlewares/catchAsyncErrors";
import User from '../model/User'
import Token from "../model/Token";
import ms from 'ms';
import ErrorHandler from "../shared/utils/ErrorHandler";

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

    res.cookie('refreshToken', token.refreshToken,  {httpOnly: true, secure: true, maxAge: ms(process.env.REFRESH_TOKEN_EXPIRE), sameSite: 'none'})
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
  res.cookie('refreshToken', token.refreshToken,  {httpOnly: true, secure: true, maxAge: ms(process.env.REFRESH_TOKEN_EXPIRE), sameSite: 'none'})
  res.status(201).json({
    accessToken
  })
})

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  const { refreshToken } = req.cookies
  await Token.findOneAndDelete(refreshToken)

  res.clearCookie('refreshToken', {httpOnly: true, secure: true, sameSite: 'none'})
  res.status(200).json({
    message: 'logout'
  })
})


