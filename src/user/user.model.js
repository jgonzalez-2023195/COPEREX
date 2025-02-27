import { Schema, model } from "mongoose"

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        surname: {
            type: String,
            required: [true, 'Surname is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        password: {
            type: String,
            required: [true, 'Passwrod is required']
        },
        role: {
            type: String,
            enum: ['ADMIN'],
            default: 'ADMIN'
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('User', userSchema)