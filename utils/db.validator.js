import { isValidObjectId } from 'mongoose'

export const objectIdValid = async(objectId)=> {
    if(!isValidObjectId(objectId)) throw new Error('Is not valid ObjectId')
}