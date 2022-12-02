import { H3Error, createError, sendError } from 'h3'
import login from '../../utils/login'
import { encrypt } from '@/utils/encryp-decrypt'
import { upsertUser } from '@/server/api/db/user'

export default defineEventHandler(async (event) => {
  try {
    const { user, password } = await readBody(event)

    const response = await login(user, password)
    console.log('response in server: ', response)

    if (response instanceof H3Error) {
      return sendError(event, response)
    }

    const rString = `[${Object.entries(response).map(arr => `[${arr.join(',')}]`).join(',')}]`
    console.log('rString: ', rString)
    const { token = '', base64Data = '' } = encrypt(rString) || {}

    const type = response.groupId.includes(20) ? 'admin' : 'user'

    setCookie(event, `${type}_token`, token, {
      httpOnly: true,
      path: type === 'admin' ? '/' : '/operations',
      maxAge: 60 * 60,
      sameSite: 'lax',
    })

    const userCreated = await upsertUser(+response.id, token, base64Data)
    console.log('user: ', userCreated)

    return response
  }
  catch (error: H3Error | any) {
    console.error('error: ', error)

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
