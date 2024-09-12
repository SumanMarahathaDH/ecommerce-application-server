import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"
import { getCategoryById, saveCategory, updateCategoryService } from "../services/categoryService.js"

export const createCategory = async (req, res) => {
    try{
        const {name} = req.body
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(409).send({
                success: false,
                message: "Category already exists"
            })
        }
        const slug = slugify(name)
        const category = await saveCategory(name, slug)
        res.status(201).send({
            success: true,
            message: "Category created successfully",
            category
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

export const getCategory = async (req, res) => {
    try{
        const {id} = req.params
        const category = await getCategoryById(id)
        if(!category){
            return res.status(404).send({
                success: false,
                message: "Category with provided id doesn't exist"
            })
        }
        res.status(200).send({
            success: true,
            category
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

export const getAllCategory = async (req, res) => {
    try{
        const categories = await categoryModel.find()
        res.status(200).send({
            success: true,
            categories
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

export const updateCategory = async (req, res) => {
    try{
        const {id} = req.params
        const {name} = req.body
        const category = await getCategoryById(id)
        if(!category){
            return res.status(404).send({
                success: false,
                message: "Category doesn't exists"
            })
        }
        const slug = slugify(name)
        const updatedCategory = await updateCategoryService(id, {name, slug})
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category: updatedCategory
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "something went wrong",
            error
        })
    }
}