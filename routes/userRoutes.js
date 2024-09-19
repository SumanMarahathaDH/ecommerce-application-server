import express from 'express'
import { changePassword, forgotPassword, getAdminUserInfo, getLoggedUser, loginUserController, registerUserController, resetPassword, updateProfile } from '../controllers/userController.js'
import { forgotPasswordRequest, resetPasswordRequest, updatePasswordRequest, updateProfileRequest, userLoginRequest, userRegistrationRequest } from '../request/user.js'
import {validator} from '../middlewares/validator.js'
import { requireAuth } from '../middlewares/requireAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const userRoutes = express.Router()

userRoutes.post('/register', userRegistrationRequest, validator, registerUserController)
userRoutes.post('/login', userLoginRequest, validator, loginUserController)
userRoutes.get('/me', requireAuth, getLoggedUser)
userRoutes.get('/adminInfo', requireAuth, isAdmin, getAdminUserInfo)
userRoutes.post('/forgot-password', forgotPasswordRequest, validator, forgotPassword)
userRoutes.post('/reset-password', resetPasswordRequest, validator, resetPassword)
userRoutes.put('/profile', updateProfileRequest, validator, requireAuth, updateProfile)
userRoutes.put('/change-password', updatePasswordRequest, validator, requireAuth, changePassword)

export default userRoutes