import { createError, defineEventHandler, getQuery, sendError } from 'h3'
import { paymentInterval } from '../utils/interval-class'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    console.log('query: ', query);

    console.log('query.start : ', query.start);
    console.log('query.stop: ', query.stop);
    if (!query.start && !query.stop) {
        console.log('is active: ', paymentInterval.isActive.value)
        return paymentInterval.isActive.value
    }

    if (query.start === '1') {
        paymentInterval.resume()
    }

    if (query.stop === '1') {
        paymentInterval.pause()
    }
    return paymentInterval.isActive.value
})