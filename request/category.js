import {check, param} from 'express-validator'

export const categoryCreateRequest = [
    check('name').trim().notEmpty().withMessage("Name is required")
]

export const categoryGetRequest = [
    param('id').trim().notEmpty().withMessage('Valid id as params is required')
]

export const categoryUpdateRequest = [
    param('id').trim().notEmpty().withMessage('Valid id as params is required'),
    check('name').trim().notEmpty().withMessage("Name is required")
]

export const categoryGetRequestBySlug = [
    param('slug').trim().notEmpty().isSlug().withMessage('Valid slug as params is required')
]

export const categoryDeleteRequest = [
    param('id').trim().notEmpty().withMessage('Valid id as params is required')
]