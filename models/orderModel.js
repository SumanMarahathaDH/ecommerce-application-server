import { mongoose, Schema } from 'mongoose';

const orderModel = new mongoose.Schema({ 
    products: [
        {
           type: Schema.Types.ObjectId,
           required: true,
           ref: "products"
        }
    ],
    customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    totalAmount: {
        type: Number,
        required: true,
        min:1,
        max: 5000000
    },
    status: {
        type: String,
        trim: true,
        default: "onProcess",
        enum: ['onProcess', 'rejected', 'shipping', 'delivered']
    }
}, {timestamps: true})


export default mongoose.model("order", orderModel)