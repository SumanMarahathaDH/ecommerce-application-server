import express  from 'express'
import { orderPostRequest } from '../request/order.js'
import {validator} from '../middlewares/validator.js'
import {requireAuth} from '../middlewares/requireAuth.js'
import { changeOrderStatus, createOrderController, getAllOrdersController, getMyAllOrders, getOrderDetail } from '../controllers/orderController.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const orderRoutes = express.Router()

orderRoutes.post('/create', orderPostRequest, validator, requireAuth, createOrderController)
orderRoutes.get('/getAll', requireAuth, isAdmin, getAllOrdersController) // for admin 
orderRoutes.get('/:id', requireAuth, isAdmin, getOrderDetail)
orderRoutes.get('', requireAuth, getMyAllOrders) // for logged in user 
orderRoutes.put('/:orderId', requireAuth, isAdmin, changeOrderStatus)

export default orderRoutes