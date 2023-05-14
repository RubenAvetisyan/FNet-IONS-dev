import { createError } from 'h3';
import { cachedAimPon } from "~/admin/utils/cach/aim-pon"

export default eventHandler(async (event) => {
  try {
    const response = await cachedAimPon()
    const body = await readBody(event)
    console.log('body: ', body);
    return response
  } catch (error: any) {
    throw createError(error)
  }
})

