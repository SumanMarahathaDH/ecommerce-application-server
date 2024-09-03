import express from 'express'
import { forgotPassword, getAdminUserInfo, getLoggedUser, loginUserController, registerUserController } from '../controllers/userController.js'
import { forgotPasswordRequest, userLoginRequest, userRegistrationRequest } from '../request/user.js'
import {validator} from '../middlewares/validator.js'
import { requireAuth } from '../middlewares/requireAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const userRoutes = express.Router()

userRoutes.post('/register', userRegistrationRequest, validator, registerUserController)
userRoutes.post('/login', userLoginRequest, validator, loginUserController)
userRoutes.get('/me', requireAuth, getLoggedUser)
userRoutes.get('/adminInfo', requireAuth, isAdmin, getAdminUserInfo)
userRoutes.post('/forgot-password', forgotPasswordRequest, validator, forgotPassword)

export default userRoutes