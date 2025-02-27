import { Schema, model } from "mongoose"

const companySchema = Schema(
    {
        name: {
            type: String, 
            requried: [true, 'Name is required']
        },
        levelOfImpact: {
            type: Number,
            requried: [true, 'Level of impact is requried']
        },
        yearsOfExperience: {
            type: Number,
            required: [true, 'Years of experience is required'],
            min: 0
        },
        category: {
            type: String,
            requried: [true, 'Category by is requried']
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            requried: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Company', companySchema)