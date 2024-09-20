import { check } from "express-validator";

export const orderPostRequest = [
    check('products').notEmpty().withMessage('Cart items could not be empty')
    .isArray().withMessage('Valid card items is required')
    .isLength({min: 1}).withMessage('There must be one item in orders')
    .isLength({max: 100}).withMessage('Cart cannot have more than 100 items'),

    check('customer').notEmpty().withMessage('Customer is required')
    .isMongoId().withMessage('Valid customer id is rewuired'),

    check('totalAmount').notEmpty().withMessage('Total Amount is required')
    .isFloat({ min: 1, max: 1000000000 }).withMessage('Price must be between 1 and 1,000,000,000'),
]
