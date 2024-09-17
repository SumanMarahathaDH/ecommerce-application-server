import slugify from 'slugify';
import productSchema from '../models/productModel.js';
import fs from 'fs';

export const createProductController = async (req, res) => {
    try{
        const {name} = req.fields
        const {photo} = req.files
        if(!photo){
            return res.status(400).send({
                success: false,
                message: "Photo is required"
            })
        }
        if(photo.size > 1000000){
            return res.status(400).send({
                success: false,
                message: "Photo size should not exceed more than 1mb"
            })
        }
        const product = new productSchema({...req.fields, slug: slugify(name)})
        if(photo){
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product
        })
        // const product = await createProduct(req.fields, slug)
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const getAllProductsController = async (req, res) => {
    try{
        const allProducts = await productSchema
        .find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({createdAt: -1})
        res.status(200).send({
            success: true,
            message: "All Products fetched successfully",
            totalData: allProducts.length,
            allProducts,
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

export const getOneProductController = async (req, res) => {
    try{
        const {slug} = req.params
        const product = await productSchema.findOne({slug})
        .select("-photo")
        .populate("category")
        if(!product){
            return res.status(404).send({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).send({
            success: true,
            message: 'Product fetched successfully',
            product
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

export const getProductPhotoController = async (req, res) => {
    try{
        const {id} = req.params
        const product = await productSchema.findById(id).select("photo")
        if(product.photo.data){
            res.set("Content-type", product.photo.contentType)
            return res.status(200).send(product.photo.data)
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


export const deleteProductController = async (req, res) => {
    try{
        const {id} = req.params
        await productSchema.findByIdAndDelete(id).select("-photo")
        res.status(200).send({
            success: false,
            message: "Product deleted successfully"
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

