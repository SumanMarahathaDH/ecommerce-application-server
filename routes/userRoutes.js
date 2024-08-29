import express from 'express'
import { registerUserController } from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.post('/register', registerUserController)

export default userRoutes