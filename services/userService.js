import userModel from "../models/userModel.js"

export const createUser = async (name, email, address, phone, hashedPassword) => {
    const user = await new userModel({
        name,
        email,
        address,
        phone,
        password: hashedPassword
    }).save()
    return user
}

export const getUserByID = async (id) => {
    const user = await userModel.findById(id)
    return user
}

export const updateUserById = async (id, updatedInfo) => {
    const user = await userModel.findByIdAndUpdate(id, updatedInfo)
    return user
}