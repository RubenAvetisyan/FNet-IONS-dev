import { H3Error, createError, sendError } from 'h3'
import { Role } from '@prisma/client'
import { $enum } from 'ts-enum-util'
import login from '../../utils/login'
// import transfrom from '../../utils/user/response-transfrom'
import { encrypt } from '@/utils/encryp-decrypt'
import { upsertUser } from '@/server/api/db/user'

export default defineEventHandler(async (event) => {
  try {
    const { user, password } = await readBody(event)

    const response = await login(user, password)
    

    if (response instanceof H3Error)
      return sendError(event, response)

    const rString = `[${Object.entries(response).map(arr => `[${arr.join(',')}]`).join(',')}]`
    
    const { token = '', base64Data = '' } = encrypt(rString) || {}

    const type = response.groupId.includes(20) ? 'admin' : 'user'

    setCookie(event, `${type}_token`, token, {
      httpOnly: true,
      path: type === 'admin' ? '/' : '/operations',
      maxAge: 60 * 60,
      sameSite: 'lax',
    })

    const roleFromType = type.toUpperCase() as ('ADMIN' | 'USER')
    const ROLE = $enum(Role).getValues().find(val => val === roleFromType)
    
    const userCreated = upsertUser({
      userId: +response?.id,
      name: response.fullName,
      email: response.email,
      token,
      base64Data,
      role: ROLE,
    })
    

    return response
  }
  catch (error: H3Error | any) {
    

    if (!(error instanceof H3Error)) {
      const err = createError({
        statusCode: 401,
        statusMessage: 'Not found',
        message: 'Ստուգեք մուտքգրվող դաշտերի լրացման ճշտությունը',
      })
      return err
    }

    return sendError(event, error)
  }
})
