import { createError, defineEventHandler, getQuery, sendError } from 'h3'
import { paymentInterval } from '../utils/interval-class'

export default defineEventHandler(async (event) => {
  const { ms } = getQuery(event)
  console.log('ms: ', ms);
  if (!ms || Number.isNaN(ms)) {
    return sendError(event, createError({
      message: `Expected "ms" param tobe a number, but got ${typeof ms}`,
      statusCode: 421,
    }))
  }

  paymentInterval.setInterval(+ms)

  return 'Done'
})