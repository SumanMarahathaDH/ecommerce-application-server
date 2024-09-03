import mongoose, { Schema } from 'mongoose'

export const tokenSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user" // same as foreign key
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // in seconds
    }
})

export default mongoose.model('tokens',tokenSchema)