import { IBalance } from '../types/balance';
import { model, Schema } from 'mongoose'

const todoSchema: Schema = new Schema({
    address: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: Boolean,
        required: true
    }

}, { timestamps: true })


export default model<IBalance>('Balance', todoSchema)