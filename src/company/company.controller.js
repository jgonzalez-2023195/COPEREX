import Company from './company.model.js'
import User from '../user/user.model.js'
import ExcelJS from 'exceljs'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

export const registerCompany = async(req, res)=> {
    const data = req.body
    try {
        const user = await User.findOne(
            {
                _id: req.user.uid
            }
        )

        if(!user) return res.status(403).send({message: 'user not found'})
        data.createdBy = req.user.uid
        const company = new Company(data)
        await company.save()
        return res.status(200).send(
            {
                success: true,
                message: 'Company register to system'
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when add company for system',
                e
            }
        )
    }
}

//Generar el excel y guardarlo en la carpeta REPORT
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export const generateExcel = async(req, res)=> {
    try {
        const user = await User.findOne(
            {
                _id: req.user.uid
            }
        )

        if(!user) return res.status(403).send({message: 'user not found'})
            
        const companies = await Company.find().populate(
            {
                path: 'createdBy',
                select: 'name surname email -_id'
            }
        )
        const workbook = new ExcelJS.Workbook()
        workbook.creator = 'COPEREX System'
        workbook.created = new Date()
        const sheet = workbook.addWorksheet('Empresas Registradas')

        sheet.columns = [
            { header: 'Nombre', key: 'name', width: 25 },
            { header: 'Nivel de Impacto', key: 'levelOfImpact', width: 15 },
            { header: 'Años de Experiencia', key: 'yearsOfExperience', width: 15 },
            { header: 'Categoría', key: 'category', width: 20 },
            { header: 'Creado Por', key: 'createdByFullName', width: 40 },
            { header: 'Fecha de Creación', key: 'createdAt', width: 18 },
        ]
        sheet.getRow(1).font = {
            name: 'Arial', // Nombre de la fuente como string
            bold: true,
            size: 12, // Opcional: tamaño de fuente
        }
        sheet.getRow(1).alignment = {vertical: 'middle', horizontal: 'center'}
        sheet.getRow(1).fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FFD3D3D3'}}
        companies.forEach(company => {
            sheet.addRow({
                name: company.name,
                levelOfImpact: company.levelOfImpact,
                yearsOfExperience: company.yearsOfExperience,
                category: company.category,
                createdByFullName: company.createdBy ? `${company.createdBy.name} ${company.createdBy.surname}` : 'Desconocido',
                createdAt: company.createdAt.toLocaleDateString(),
            })
        })
        const filePath = path.join(__dirname, '../report', `Reporte_Empresa_${Date.now()}.xlsx`)
        await fs.mkdir(path.dirname(filePath), {recursive: true})
        await workbook.xlsx.writeFile(filePath)
        console.log(`Reporte guardado en ${filePath}`)
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition', 'attachment; filename="Reporte_Empresas.xlsx"')
        const buffer = await workbook.xlsx.writeBuffer()
        res.send(buffer)
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'Error generating company report',
                e
            }
        )
    }
}

export const listCompanies = async(req, res)=> {
    const {limit, skip, category, yearExperience, sort, order, levelMin, levelMax} = req.query
    try {
        const user = await User.findOne(
            {
                _id: req.user.uid
            }
        )

        if(!user) return res.status(403).send({message: 'user not found'})

        const filter = {}
        if(levelMin||levelMax){
            filter.levelOfImpact = {}
            if(levelMin) filter.levelOfImpact.$lte = parseInt(levelMin)
            if(levelMax) filter.levelOfImpact.$gte = parseInt(levelMax)
        }
        if(category) filter.category = category

        if (yearExperience) {
            filter.yearsOfExperience = parseInt(yearExperience)
        }

        const sortOptions = {}
        if(sort){
            sortOptions[sort] = order === 'desc' ? -1 : 1
        }
        const company = await Company.find(filter).limit(limit).skip(skip).sort(sortOptions).populate(
            {
                path: 'createdBy',
                select: 'name surname email -_id'
            }
        )
        if(!company) return res.status(404).send(
            {
                success: false,
                message: 'Company not found'
            }
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Companies: ',
                company
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error cannot see companies in the system',
                e
            }
        )
    }
}

export const updateCompany = async(req, res)=> {
    const id = req.params.id
    const data = req.body
    try {
        const company = await Company.findByIdAndUpdate(id, data, {new: true})

        if(!company) return res.status(404).send(
            {
                success: false,
                message: 'Company not found, company not update'
            }
        ) 
        return res.status(200).send(
            {
                success: true,
                message: 'Company updated successfully',
                company
            }
        )

    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when updated comment',
                e
            }
        )
    }
}