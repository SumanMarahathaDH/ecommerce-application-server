import tokenModel from "../models/tokenModel.js"

export const saveNewToken = async (userId, token) => {
    await new tokenModel({
        userId,
        token
    }).save()
}