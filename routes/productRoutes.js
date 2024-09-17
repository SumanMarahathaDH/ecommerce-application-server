import express from "express"
import { productCreateRequest } from "../request/product.js"
import {validator} from '../middlewares/validator.js'
import {requireAuth} from '../middlewares/requireAuth.js'
import {isAdmin} from '../middlewares/isAdmin.js'
import formidable from 'express-formidable'
import { createProductController } from "../controllers/productController.js"

const productRoutes = express.Router()

productRoutes.post('/create', productCreateRequest, validator, requireAuth, isAdmin, formidable(), createProductController)

export default productRoutes