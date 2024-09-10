import express from 'express'
import {validator} from '../middlewares/validator.js'
import { requireAuth } from '../middlewares/requireAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import {categoryCreateRequest} from '../request/category.js'
import { createCategory } from '../controllers/categoryController.js'

const categoryRoutes = express.Router()

categoryRoutes.post('/create', categoryCreateRequest, validator, requireAuth, isAdmin, createCategory)

export default categoryRoutes