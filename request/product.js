import {check} from 'express-validator'

export const productCreateRequest = [
    check('name').trim().notEmpty()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
    .isLength({ max: 20 }).withMessage('Name cannot exceed 20 characters'),

    check('description').trim().notEmpty()
    .isLength({min: 2}).withMessage('Description must be at least 2 characters')
    .isLength({max: 1000}).withMessage('Description cannot exceed 20 characters'),

    check('price').trim().notEmpty().isNumeric({min: 1, max: 1000000000}).withMessage('Price must be between 1 and 100000000'),
    check('rating').trim().notEmpty().isNumeric({min: 1, max: 5}).withMessage('Rating must be between 1 and 5'),
    check('category').trim().notEmpty().withMessage('Category is required')
]