import { validationResult } from 'express-validator'

export const validateErrors = (req, res, next)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return next(errors)
    next()
}