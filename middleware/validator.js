import { body } from 'express-validator'
import { validateErrors } from './validate.errors.js'
import { objectIdValid } from '../utils/db.validator.js'

export const company = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .isLength({min: 4}).withMessage('Te Name must be at least 8 characters long'),
    body('levelOfImpact', 'Level of impact cannot be empty')
        .notEmpty()
        .isInt({min: 1}).withMessage('The impact levels range from 1 - 10, with 1 being none and 10 being many workers.'),
    body('yearsOfExperience', 'Years of experience cannot be empty')
        .notEmpty()
        .isInt({min: 0}).withMessage('The minimum years of experience is 0.'),
    body('category', 'Category cannot be empty')
        .notEmpty(),
    validateErrors
]