import { mongoose } from 'mongoose';

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    }
}, {timestamps: true})

export default mongoose.model("category", categoryModel)