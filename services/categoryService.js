import categoryModel from "../models/categoryModel.js"

export const saveCategory = async (name, slug) => {
   const category = await new categoryModel({name, slug}).save()
   return category
}