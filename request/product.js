import { check } from 'express-validator';

export const productCreateRequest = [
    // Validate 'name' field
    check('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long')
        .isLength({ max: 20 }).withMessage('Name cannot exceed 20 characters'),

    // Validate 'description' field
    check('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 2 }).withMessage('Description must be at least 2 characters long')
        .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),

    // Validate 'price' field
    check('price')
        .trim()
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 1, max: 1000000000 }).withMessage('Price must be between 1 and 1,000,000,000'),

    // Validate 'category' field
    check('category')
        .trim()
        .notEmpty().withMessage('Category is required'),

    // Validate 'quantity' field
    check('quantity')
        .trim()
        .notEmpty().withMessage('Quantity is required')
        .isInt({ min: 1, max: 100000 }).withMessage('Quantity must be between 1 and 100,000'),

    // Validate 'shipping' field
    check('shipping')
        .optional()
        .isBoolean().withMessage('Valid shipping value is required')
];
