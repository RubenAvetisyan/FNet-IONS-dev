// import { decrypt } from '@/utils/encryp-decrypt'
import getUserById from '@/admin/utils/user'
import { getUserByToken } from '@/server/api/db/user'

export default defineEventHandler(async (event) => {
  const { encrypted } = getQuery(event)

  if (!encrypted)
    return

  const token = encrypted as string
  let user = await getUserByToken(token)

  if (!user) {
    return sendError(event, createError({
      message: 'this token is not valid',
      statusCode: 403,
    }))
  }

  user = await getUserById(user.userId)

  return { decrypted: user }
})
