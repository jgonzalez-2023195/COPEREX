import User from '../src/user/user.model.js'
import { encrypt } from '../utils/encrypt.validations.js'

export const initUser = async()=> {
    try {
        const adminExists = await User.findOne()

        if (!adminExists) {
            console.log('Creating user in the system')

            let password = process.env.PASSWORD
            const encryptPassword = await encrypt(password)

            const adminUser = new User(
                {
                    name: process.env.NAME,
                    surname: process.env.SURNAME,
                    email: process.env.EMAIL,
                    password: encryptPassword,
                    role: process.env.ROLE
                }
            )

            await adminUser.save()
            console.log('User successfully created')
        } else {
            console.log('Default user already created')
        }
    } catch (e) {
        console.error('General error when register ADMIN to system', e)
    } 
}