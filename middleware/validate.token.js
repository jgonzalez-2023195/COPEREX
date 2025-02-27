'use strict'

import jwt from 'jsonwebtoken'

export const validateTokenJWT = async(req, res, next)=> {
    try {
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(401).send({message: 'Unauthorized'})
        let user = jwt.verify(authorization, secretKey)
        req.user = user
        next()
    } catch (e) {
        console.error(e)
        return res.status(401).send(
            {
                message: 'Invalid credentials'
            }
        )
    }
}

export const isAdmin = async(req, res, next)=> {
    try {
        const { user } = req
        if(!user  || user.role != 'ADMIN') return res.status(403).send(
            {
                succes: false,
                message: `You dont have acces | username ${user.name}, is not an ADMIN`
            }
        )
        next()
    } catch (e) {
        console.error(e);
        return res.status(403).send(
            {
                success: false,
                message: 'Error with authorization'
            }
        )
    }
}