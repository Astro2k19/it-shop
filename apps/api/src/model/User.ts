import mongoose, {HydratedDocument} from "mongoose";
import {UserModel, UserRoles} from "@it-shop/types";
import bgcryp from 'bcrypt'

interface UserModelMethods {
  comparePasswords: (password: string) => Promise<boolean>
}

type HydratedUser = HydratedDocument<UserModel, UserModelMethods>;

const roles = ['User', 'Admin']

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
    enum: ['User', 'Admin'],
    default: ['User']
  },
  resetPasswordToken: String,
  resetPasswordExpire: mongoose.Schema.Types.Date,
}, {timestamps: true})

User.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  this.password = await bgcryp.hash(this.password, 10);
})

User.methods.comparePasswords = async function (password: string) {
  return bgcryp.compare(password, this.password)
}

export default mongoose.model('User', User)
