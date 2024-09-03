import express from 'express'
import { loginUserController, registerUserController } from '../controllers/userController.js'
import { userLoginRequest, userRegistrationRequest } from '../request/user.js'
import {validator} from '../middlewares/validator.js'

const userRoutes = express.Router()

userRoutes.post('/register', userRegistrationRequest, validator, registerUserController)
userRoutes.post('/login', userLoginRequest, validator, loginUserController)

export default userRoutes