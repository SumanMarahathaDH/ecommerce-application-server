import mongoose from 'mongoose'

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
    rating: {
        type: Number,
        trim: true,
        min: 1
    },
    category: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: "category"
    }
}, {timestamps: true})

export default mongoose.model("products", productSchema)