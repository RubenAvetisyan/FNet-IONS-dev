import { prisma } from '.'

export const createUser = (userData: {
    userId: number
    token: string
    base64Data: string
}) => {
    console.log('userData: ', userData);
    return prisma.user.create({
        data: userData
    })
}