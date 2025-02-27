'use strict'

import { hash, verify } from 'argon2'

export const encrypt = async(password)=> {
    try {
        return await hash(password)
    } catch (e) {
        console.error(e);
        return e
    }
}

export const checkPassword = async(hash, password)=> {
    try {
        return await verify(hash, password)
    } catch (e) {
        return e
    }
}