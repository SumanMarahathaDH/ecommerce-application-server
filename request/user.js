import { check } from "express-validator";

export const userRegistrationRequest = [
    check('name').trim().notEmpty().withMessage('Name is required'),
    check('email').trim().isEmail().withMessage('Valid Email is required'),
    check('password').trim().isLength({min: 6}).withMessage('Password must be at least 6 characters'),
    check('phone').trim().notEmpty().withMessage('Phone number is required'),
    check('address').trim().notEmpty().withMessage('Address is required')
]

export const userLoginRequest = [
    check('email').trim().isEmail().withMessage("Please provide valid email address"),
    check('password').trim().isLength({min: 6}).withMessage('Password must be at least 6 characters')
]

export const forgotPasswordRequest = [
    check('email').trim().isEmail().withMessage("Valid Email is required")
]