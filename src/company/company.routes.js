import { Router } from "express"
import { generateExcel, listCompanies, registerCompany, updateCompany } from './company.controller.js'
import { company, updatCompany } from '../../middleware/validator.js'
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

api.get(
    '/list/companies',
    [
        validateTokenJWT,
        isAdmin
    ],
    listCompanies
)

api.put(
    '/update/company/:id',
    [
        validateTokenJWT,
        isAdmin,
        updatCompany
    ],
    updateCompany
)

export default api