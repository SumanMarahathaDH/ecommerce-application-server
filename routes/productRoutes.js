import express from "express"
import { productCreateRequest, productDeleteRequest, ProductGetRequestBySlug, productPhotoGetRequest } from "../request/product.js"
import {validator} from '../middlewares/validator.js'
import {requireAuth} from '../middlewares/requireAuth.js'
import {isAdmin} from '../middlewares/isAdmin.js'
import formidable from 'express-formidable'
import { createProductController, deleteProductController, getAllProductsController, getOneProductController, getProductPhotoController } from "../controllers/productController.js"

const productRoutes = express.Router()

productRoutes.post('/create', requireAuth, isAdmin, formidable(), createProductController)
productRoutes.get('', requireAuth, getAllProductsController)
productRoutes.get('/:slug', ProductGetRequestBySlug, validator, requireAuth, getOneProductController)
productRoutes.get('/photo/:id', productPhotoGetRequest, validator, requireAuth, getProductPhotoController)
productRoutes.delete('/:id', productDeleteRequest, validator, requireAuth, isAdmin, deleteProductController)

export default productRoutes