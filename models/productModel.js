import mongoose, { Schema } from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 20
    },
    slug: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxLength: 1000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        min: 1
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "category"
    },
    quantity: {
        type: Number,
        required: true,
        trim: true,
        min: 1,
        max: 100000
    },
    shipping: {
        type: Boolean
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true})

export default mongoose.model("products", productSchema)