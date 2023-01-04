import { User, TelegramUser } from '@prisma/client'
import { prisma } from './index'

type Id = PropType<User, 'id'>
type Tgid = PropType<TelegramUser, 'tg_id'>

export const getUserFormTelegramBot = async (id: Id | Tgid): Promise<TelegramUser | null> => {
    try {
        if (!id) throw new Error('invalid id in "getUserFormTelegramBot" db method')

        const key = typeof id === 'number' ? 'tg_id' : 'id'

        return await prisma.telegramUser.findFirst({
            where: {
                [key]: id,
            },
        })
    } catch (error: any) {
        createError(error?.message || error)
        return null
    }
}

export const upsertTelegramBotUser = async (id: Id, telegramUser: Partial<TelegramUser>) => {
    const tUser = { ...telegramUser, userId: id } as TelegramUser
    return await prisma.telegramUser.upsert({
        where: { userId: id },
        create: { ...tUser },
        update: { ...tUser },
    })
}