import userModel from "../models/userModel.js"
import { createUser, getUserByID, updateUserById } from "../services/userService.js"
import { comparePassword, compareToken, hashPassword } from "../utils/authHelpers.js"
import JWT from 'jsonwebtoken'
import { environmentConfig } from "../config/environment.js"
import tokenModel from "../models/tokenModel.js"
import crypto from 'crypto'
import { getTokenByUserId, saveNewToken } from "../services/tokenService.js"
import { sendEmail } from "../utils/emailHelper.js"

export const registerUserController = async (req, res) => {
    const {name, email, password, address, phone} = req.body
    try{
        const existingUser = await userModel.findOne({email: email})
        if(existingUser){
            return res.status(400).send({
                success: false,
                message: 'User already exists!'
            })
        }
        const hashedPassword = await hashPassword(password)
        const newUser = await createUser(name, email, address, phone, hashedPassword)
        res.status(201).send({
            success: true,
            message: "Registration successful",
            user: newUser
        })
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: 'Registration failed!',
            err
        })
    }
}

export const loginUserController = async (req, res) => {
    try {
        const {email ,password} = req.body
        const doesuserExists = await userModel.findOne({email: email})
        if(!doesuserExists){
            return res.status(404).send({
                success: false,
                message: "User doesn't exists"
            })
        }
        const isValidPassword = await comparePassword(password, doesuserExists.password)
        if(!isValidPassword){
            return res.status(400).send({
                success: false,
                message: "Invalid Password"
            })
        }
        const token = JWT.sign({_id: doesuserExists._id}, environmentConfig.jwtSecret, {expiresIn: '1h'})
        res.status(200).send({
            success: true,
            message: "Login successful",
            token
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: 'Login Failed!',
            error
        })
    }
}

export const getLoggedUser = async (req, res) => {
    try{
        const id = req.user._id
        const user = await getUserByID(id)
        if(user){
            res.status(200).send({
                success: true,
                user
            })
        }
        else {
             res.status(500).send({
                success: false,
                message: "Something went wrong",
            })
        }
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const getAdminUserInfo = async (req, res) => {
    try{
        const id = req.user._id
        const user = await getUserByID(id)
        if(user){
            res.status(200).send({
                success: true,
                user
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "User doesn't exists"
            })
        }
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const forgotPassword = async (req, res) => {
    try{
        const {email} = req.body
        const existingUser = await userModel.findOne({email: email})
        if(!existingUser){
            return res.status(404).send({
                success: false,
                message: "User doesn't exists"
            })
        }
        const existingToken = await tokenModel.findOne({userId: existingUser._id})
        if(existingToken){
            await tokenModel.deleteMany({userId: existingUser._id})
        }
        const resetPasswordToken = crypto.randomBytes(32).toString("hex")
        const hashedResetPasswordToken = await hashPassword(resetPasswordToken)
        await saveNewToken(existingUser._id, hashedResetPasswordToken)
        const clientURL = process.env.CLIENT_URL
        const resetPasswordLink = `${clientURL}/password-reset?userId=${existingUser._id}&token=${resetPasswordToken}`
        try{
            await sendEmail(existingUser.email, 
                "Your reset password link has arrived", 
                {
                    name: existingUser.name,
                    link: resetPasswordLink
                },
                'utils/templates/passwordResetEmail.handlebars'
            )
            res.status(200).send({
                success: true,
                message: "Email sent successfully"
            })
        }
        catch(error){
            res.status(500).send({
                success: false,
                message: "Could not send email, Please try again!"
            })
        }
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const resetPassword = async (req, res) => {
    try{
        const {userId, token, password} = req.body
        const existingUser = await getUserByID(userId)
        if(!existingUser){
            return res.status(404).send({
                success: false,
                message: "User doesn't exist"
            })
        }
        const existingToken = await getTokenByUserId(userId)
        if(!existingToken){
            return res.status(400).send({
                success: false,
                message: "Invalid or expired token"
            })
        }
        const isValidToken = await compareToken(token, existingToken.token)
        if(!isValidToken){
            return res.status(400).send({
                success: false,
                message: "Invalid or expired token"
            })
        }
        const hashedNewPassword = await hashPassword(password)
        await updateUserById(existingUser._id, {
            password: hashedNewPassword
        })
        await existingToken.deleteOne()
        res.status(200).send({
            success: true,
            message: "Password reset successfully"
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}