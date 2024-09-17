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