import { prisma } from '.'

export const createUser = (userData: {
  userId: number
  token: string
  base64Data: string
}) => {
  console.log('userData: ', userData)
  return prisma.user.create({
    data: userData,
  })
}

export const getUserById = (userId: number, token: string) => {
  return prisma.user.findFirst({
    where: {
      AND: [
        { token },
        { userId },
      ],
    },
  })
}

export const upsertUser = async (userId: number, token: string, base64Data: string) => {
  return await prisma.user.upsert({
    where: {},
    create: { userId, token, base64Data },
    update: { token, base64Data },
  })
}
