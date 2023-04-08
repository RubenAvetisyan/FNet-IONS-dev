import { createError } from 'h3'
export default defineEventHandler((event) => {
  try {
    const { type } = getQuery(event)

    const name = type as string
    
    deleteCookie(event, name)
    return 'user is logged out'
  }
  catch (error) {
    console.log('error: ', error);
    return createError(JSON.stringify(error))
  }
})
