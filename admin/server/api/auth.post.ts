import { H3Error, createError, sendError } from 'h3'
import login from '../../utils/login'
import { encrypt } from '@/utils/encryp-decrypt'
import { createUser } from '@/server/api/db/user'

export default defineEventHandler(async (event) => {
  try {
    const { user, password } = await readBody(event)
    const { type } = getQuery(event)

    if (!type) {
      throw createError({
        message: 'Check the URL!',
        statusCode: 406,
        statusMessage: 'Not Acceptable!',
      })
    }

    const response = await login(user, password)
    console.log('response in server: ', response)

    if (response instanceof H3Error)
      throw response

    const rString = `[${Object.entries(response).map(arr => `[${arr.join(',')}]`).join(',')}]`
    console.log('rString: ', rString)
    const { token = '', base64Data = '' } = encrypt(rString) || {}

    setCookie(event, `${type}_token`, token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 1000,
      sameSite: 'lax',
    })

    createUser({
      userId: response.id,
      token,
      base64Data
    })

    return response
  }
  catch (error: H3Error | any) {
    console.error('error: ', error)
    const err = createError({
      statusCode: 401,
      statusMessage: 'Not found',
      message: 'Ստուգեք մուտքգրվող դաշտերի լրացման ճշտությունը',
    })
    if (!(error instanceof H3Error))
      return err
    return sendError(event, error)
  }
})
