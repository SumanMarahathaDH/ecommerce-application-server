import express from 'express'
import {validator} from '../middlewares/validator.js'
import { requireAuth } from '../middlewares/requireAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import {categoryCreateRequest, categoryGetRequest, categoryUpdateRequest} from '../request/category.js'
import { createCategory, getAllCategory, getCategory, updateCategory } from '../controllers/categoryController.js'

const categoryRoutes = express.Router()

categoryRoutes.post('/create', categoryCreateRequest, validator, requireAuth, isAdmin, createCategory)
categoryRoutes.get('/:id', categoryGetRequest, validator, requireAuth, getCategory)
// categoryRoutes.get('/slug/:slug', )
categoryRoutes.get('', requireAuth, getAllCategory)
categoryRoutes.put('/:id', categoryUpdateRequest, validator, requireAuth, isAdmin, updateCategory)

export default categoryRoutes