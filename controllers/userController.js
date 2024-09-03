import userModel from "../models/userModel.js"
import { createUser } from "../services/userService.js"
import { comparePassword, hashPassword } from "../utils/authHelpers.js"
import JWT from 'jsonwebtoken'
import { environmentConfig } from "../config/environment.js"

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