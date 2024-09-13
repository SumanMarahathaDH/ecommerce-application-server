import categoryModel from "../models/categoryModel.js"

export const saveCategory = async (name, slug) => {
   const category = await new categoryModel({name, slug}).save()
   return category
}

export const getCategoryById = async (id) => {
   const category = await categoryModel.findById(id)
   return category
}

export const getCategoryBySlug = async (slug) => {
   const category = await categoryModel.findOne({slug})
   return category
}

export const updateCategoryService = async (id, updatedData) => {
   const newCategory = await categoryModel.findByIdAndUpdate(id, updatedData, {new: true})
   return newCategory
} 

export const deleteCategoryById = async (id) => {
   await categoryModel.findByIdAndDelete(id)
}