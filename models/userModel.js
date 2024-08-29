import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export default mongoose.model('user', userModel)