import { Document } from 'mongoose'

export interface IBalance extends Document {
    address: string
    amount: number
    status: boolean
}