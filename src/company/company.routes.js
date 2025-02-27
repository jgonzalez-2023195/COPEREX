import { Router } from "express"
import { generateExcel, registerCompany } from './company.controller.js'
import { company } from '../../middleware/validator.js'
import { isAdmin, validateTokenJWT } from '../../middleware/validate.token.js'

const api = Router()

api.post(
    '/register/company',
    [
        validateTokenJWT,
        isAdmin,
        company
    ],
    registerCompany
)

api.get(
    '/report/company',
    [
        validateTokenJWT,
        isAdmin
    ],
    generateExcel
)

export default api