import express from "express"
import { productByCategoryGetRequest, productByPageRequest, productCreateRequest, productDeleteRequest, ProductGetRequestBySlug, productPhotoGetRequest, productUpdateRequest } from "../request/product.js"
import {validator} from '../middlewares/validator.js'
import {requireAuth} from '../middlewares/requireAuth.js'
import {isAdmin} from '../middlewares/isAdmin.js'
import { createProductController, deleteProductController, getAllProductsController, getOneProductController, getProductByCategory, getProductByPage, getProductPhotoController, getTotalProductCountController, updateProductController } from "../controllers/productController.js"
import { formidableParser } from "../middlewares/formidableParser.js"

const productRoutes = express.Router()

productRoutes.post('/create', formidableParser, productCreateRequest, validator, requireAuth, isAdmin, createProductController)
productRoutes.get('', requireAuth, getAllProductsController)
productRoutes.get('/:slug', ProductGetRequestBySlug, validator, requireAuth, getOneProductController)
productRoutes.get('/photo/:id', productPhotoGetRequest, validator, requireAuth, getProductPhotoController)
productRoutes.delete('/:id', productDeleteRequest, validator, requireAuth, isAdmin, deleteProductController)
productRoutes.put('/:slug', formidableParser, productUpdateRequest, validator, requireAuth, isAdmin, updateProductController)
productRoutes.get('/total/count', requireAuth, getTotalProductCountController)
productRoutes.get('/pages/:page', productByPageRequest, validator, requireAuth, getProductByPage)
productRoutes.get('/category/:slug', productByCategoryGetRequest, validator, requireAuth, getProductByCategory)

export default productRoutes