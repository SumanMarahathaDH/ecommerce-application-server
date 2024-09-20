import orderModel from "../models/orderModel.js"

export const createOrderController = async (req, res) => {
    try{
        const {products, customer, totalAmount} = req.body
        const order = await new orderModel({
            products,
            customer,
            totalAmount
        }).save()
        res.status(201).send({
            success: true,
            message: 'Order created successfully',
            order
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

export const getAllOrdersController = async(req, res) => {
    try{
        const orders = await orderModel.find({}).populate('products', 'name').populate('customer', 'name').sort({createdAt: -1})
        res.status(200).send({
            success: true,
            message: "Orders fetched successfully",
            totalOrders: orders.length,
            orders
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

export const getOrderDetail = async (req, res) => {
    try{
        const {id} = req.params
        const order = await orderModel.findById(id).populate({path: 'products', select: '-photo'}).populate({path: 'customer', select: '-password'}).sort({createdAt: -1})
        res.status(200).send({
            success: true,
            message: "Order detail fetched successfully",
            order
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

export const getMyAllOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({customer: req.user._id}).populate({path: 'products', select: '-photo'}).populate({path: 'customer', select: '-password'}).sort({createdAt: -1})
        res.status(200).send({
            success: true,
            message: "All orders fetched successfully",
            totalOrders: orders.length,
            orders
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

export const changeOrderStatus = async (req, res) => {
    try {
        const {orderId} = req.params
        console.log(orderId ,"<<<<<<<<<<<<<<<<<")
        const order = await orderModel.findByIdAndUpdate(orderId, {...req.body} , {new: true})
        res.status(200).send({
            success: true,
            message: 'Order status changed successfully',
            order
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