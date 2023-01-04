import { Prisma, Role, User } from '@prisma/client'
import { prisma } from './index'

type Id = PropType<User, 'id'>

export const createUser = (userData: User) => {
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

export const getUserByTgId = (id: Id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export const upsertUser = async (params: Prisma.Without<Prisma.UserUncheckedCreateInput, Prisma.UserCreateInput> & Prisma.UserCreateInput) => {
  const { userId, token, base64Data, name, email, role } = params
  return await prisma.user.upsert({
    where: { userId: userId as number },
    create: { userId: userId as number, token: token as string, base64Data: base64Data as string, name, email, role: role as Role },
    update: { userId: userId as number, token: token as string, base64Data: base64Data as string, name, email, role: role as Role },
  })
}
