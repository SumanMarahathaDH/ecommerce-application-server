import userModel from "../models/userModel.js"
import { createUser } from "../services/userService.js"
import { hashPassword } from "../utils/authHelpers.js"

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