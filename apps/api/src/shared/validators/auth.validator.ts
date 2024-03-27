import Joi from "joi";
import {roles} from "../../model/User";

const authRegister = Joi.object().keys({
  name: Joi.string().trim().required().max(50).messages({
    'any.required': 'Please enter your name',
    'string.max': 'Your name cannot exceed 50 characters',
  }),
  email: Joi.string().trim().email().required().messages({
    'any.required': 'Please enter your email',
    'string.email': 'Email is not valid',
  }),
  password: Joi.string().trim().min(6).required().messages({
    'any.required': 'Please enter your password',
    'string.min': 'Your password must be at least 6 characters',
  }),
});

const authLogin = Joi.object().keys({
  email: Joi.string().trim().email().required().messages({
    'string.required': 'Please enter your email',
    'string.email': 'Email must be valid',
  }),
  password: Joi.string().trim().required().messages({
    'string.required': 'Please enter your password',
    'string.min': 'Your password must be at least 6 characters',
  }),
});

const passwordForgot = Joi.object().keys({
  email: Joi.string().trim().email().required().messages({
    'string.required': 'Please enter your email',
    'string.email': 'Email must be valid',
  }),
});


const passwordReset = Joi.object().keys({
  password: Joi.string().trim().required().messages({
    'string.required': 'Please enter your password',
    'string.min': 'Your password must be at least 6 characters',
  }),
  comparedPassword: Joi.ref('password')
}).with('password', 'comparedPassword');

const passwordUpdate = Joi.object().keys({
  password: Joi.string().trim().min(6).required().messages({
    'any.required': 'Please enter your new password',
    'string.min': 'Your new password must be at least 6 characters',
  }),
  oldPassword: Joi.string().trim().required().messages({
    'any.required': 'Please enter your old password',
  }),
})

const updateUserProfile = Joi.object().keys({
  name: Joi.string().trim().max(50).messages({
    'string.max': 'Your name cannot exceed 50 characters',
  }),
  email: Joi.string().trim().email().messages({
    'string.email': 'Email is not valid',
  }),
})

const updateUserDetails = Joi.object().keys({
  name: Joi.string().trim().max(50).messages({
    'string.max': 'Your name cannot exceed 50 characters',
  }),
  email: Joi.string().trim().email().messages({
    'string.email': 'Email is not valid',
  }),
  roles: Joi.array().items(
    Joi.string().valid(...roles).required()
  )
})

export default {
  '/auth/register': authRegister,
  '/auth/login': authLogin,
  '/password/forgot': passwordForgot,
  '/password/update': passwordUpdate,
  '/password/reset': passwordReset,
  '/me/update': updateUserProfile,
  '/admin/users/:id': updateUserDetails,
}
