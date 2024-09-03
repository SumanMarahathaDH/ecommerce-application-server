import mongoose, { Schema } from 'mongoose'

export const tokenSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    token: {
        type: String,
        required: true,
        expires: 3600 // in seconds
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

export default mongoose.model('tokens',tokenSchema)