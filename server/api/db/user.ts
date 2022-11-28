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

export const getUserByToken = (token: string) => {
  return prisma.user.findFirst({
    where: {
      token,
    },
  })
}

export const upsertUser = async (userId: number, token: string, base64Data: string) => {
  return await prisma.user.upsert({
    where: { userId },
    create: { userId, token, base64Data },
    update: { token, base64Data },
  })
}
