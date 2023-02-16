import { defineEventHandler, getQuery } from 'h3'
import { paymentInterval } from '../utils/interval-class'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  console.log('query.state : ', query.state)
  if (!query.state) {
    console.log('is active: ', paymentInterval.isActive.value)
    return paymentInterval.isActive.value
  }

  if (query.state === 'start')
    paymentInterval.resume()
  else
    paymentInterval.pause()

  return paymentInterval.isActive.value
})
