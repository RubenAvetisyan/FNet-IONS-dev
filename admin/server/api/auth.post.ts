import { createError, sendError } from 'h3'
import login from '../../utils/login'

export default defineEventHandler(async (event) => {
    try {
        const { user, password } = await readBody(event)
        const response = await login(user, password)
        console.log('response in server: ', response);

        return response
    }
    catch (error) {
        console.log('error: ', error);
        const err = createError({
            statusCode: 401,
            statusMessage: 'Not found',
            message: 'Ստուգեք մուտքգրվող դաշտերի լրացման ճշտությունը',
        })
        return sendError(event, err)
    }
})
