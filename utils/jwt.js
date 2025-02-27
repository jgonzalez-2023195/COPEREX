'use strict'

import jwt from 'jsonwebtoken'

export const generateTokenJWT = async(payload)=> {
    try {
        return jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: '5h',
                algorithm: 'HS256'
            }
        )
    } catch (e) {
        console.error(e);
        return e
    }
}