import productModel from "../models/productModel.js"

export const createProduct = async (fields,slug) => {
    const product = await new productModel({...fields, slug}).save()
    return product
}