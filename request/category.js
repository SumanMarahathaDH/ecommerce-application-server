import {check} from 'express-validator'

export const categoryCreateRequest = [
    check('name').trim().notEmpty().withMessage("Name is required")
]