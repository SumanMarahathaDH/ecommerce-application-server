import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"
import { saveCategory } from "../services/categoryService.js"

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