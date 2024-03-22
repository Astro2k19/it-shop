import mongoose, {HydratedDocument} from "mongoose";
import {UserModel, UserRoles} from "@it-shop/types";
import bgcryp from 'bcrypt'
import crypto from 'crypto'
import ms from "ms";
import PasswordService from "../services/PasswordService";

interface UserModelMethods {
  comparePasswords: (password: string) => Promise<boolean>
  getResetPasswordToken: () => string
}

type HydratedUser = HydratedDocument<UserModel, UserModelMethods>;

const roles: UserRoles[] = ['User', 'Admin']

const User = new mongoose.Schema<HydratedUser>({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxlength: [50, 'Your name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Your password must be at least 6 characters'],
    select: false
  },
  avatar: {
    public_id: String,
    url: String,
  },
  roles: {
    type: [String],
    enum: roles,
    default: ['User']
  },
  resetPasswordToken: String,
  resetPasswordExpire: mongoose.Schema.Types.Date,
}, {timestamps: true})

User.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await PasswordService.hashPassword(this.password);
})

User.methods.comparePasswords = async function (password: string) {
  return bgcryp.compare(password, this.password)
}

User.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.resetPasswordExpire = Date.now() + ms('15m')

  return resetToken
}

export default mongoose.model('User', User)
