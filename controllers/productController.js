import slugify from 'slugify';
import productSchema from '../models/productModel.js';
import fs from 'fs';
import categoryModel from '../models/categoryModel.js';

export const createProductController = async (req, res) => {
    try{
        const {name} = req.body
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
        const product = new productSchema({...req.body, slug: slugify(name)})
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

    export const updateProductController = async (req, res) => {
        try{
            const {slug} = req.params
            const {name} = req.body
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
            const product = await productSchema.findOne({slug})
            .select("-photo")
            .populate("category")
            if(!product){
                return res.status(404).send({
                    success: false,
                    message: "Product not found"
                })
            }
            const updatedProduct = await productSchema.findByIdAndUpdate(product.id, {...req.body, slug: slugify(name)}, {new: true})
            if(photo){
                updatedProduct.photo.data = fs.readFileSync(photo.path)
                updatedProduct.photo.contentType = photo.type
            }
            await updatedProduct.save()
            res.status(200).send({
                success: true,
                message: "Product updated successfully",
                product: updatedProduct
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

    export const getTotalProductCountController = async (req, res) => {
        try{
            const totalCount = await productSchema.find({}).estimatedDocumentCount()
            res.status(200).send({
                success: true,
                message: "Total product count fetched successfully",
                totalCount
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


export const getProductByPage = async (req, res) => {
    try{
        const page = req.params.page ?? 1
        const perPageItems = 10
        const products = await productSchema.find({}).select('-photo').populate('category').skip((page - 1) * perPageItems).limit(perPageItems).sort({createdAt: -1})
        res.status(200).send({
            success: true,
            message: "Products fetched successfully",
            products,
            totalCount: products.length
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

export const getProductByCategory = async (req, res) => {
    try{
        const {slug} = req.params
        const category = await categoryModel.findOne({slug})
        if(!category){
            return res.status(400).send({
                success: false,
                message: "Category of provided slug not found"
            })
        }
        const products = await productSchema.find({category: category._id}).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: "Products fetched successfully",
            products,
            totalCount: products.length
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

export const searchProductController = async (req, res) => {
    try{
        const {keyword} = req.query
        const products = await productSchema.find({
            $or: [
                {
                    name: { $regex:  keyword?.trim() , $options: 'i'}
                },
                {
                    description: { $regex: keyword?.trim(), $options: 'i' }
                }
            ]
        }).select("-photo").populate('category')
        res.status(200).send({
            success: false,
            message: `product for keyword ${keyword} fetched successfully`,
            totalCount: products.length,
            products
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