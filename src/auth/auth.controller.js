import User from '../user/user.model.js'
import { checkPassword } from '../../utils/encrypt.validations.js'
import { generateTokenJWT } from '../../utils/jwt.js'

export const login = async(req, res)=> {
    try {
        let { userLogin, password } = req.body
        let user = await User.findOne(
            {
                $or: [
                    { email: userLogin }
                ]
            }
        )
        console.log(user)
        if(user && await checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role
            }
            let token = await generateTokenJWT(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name} to system`,
                    loggedUser,
                    token
                }
            )
        }

        return res.status(404).send({message: 'Invalid Credentials'})
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'Internal Server error', 
                e
            }
        )
    }
}