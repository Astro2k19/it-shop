import mongoose from "mongoose";
import {UserModel} from "@it-shop/types";

const UserSchema = new mongoose.Schema<UserModel>({
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
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin']
    },
    resetPasswordToken: String,
    resetPasswordExpire: mongoose.Schema.Types.Date
}, {timestamps: true})

mongoose.model('User', UserSchema)
