import brcypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export async function login(username, password) {
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    const success = await brcypt.compare(password, user.password)

    if(success)
        return generateJWT(user);
    else
        return false
}

export async function addUser(username, password) {
    const data = await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })

    return data
}

async function generateJWT(user) {
    const token = jwt.sign({ user: user })
    return token
}