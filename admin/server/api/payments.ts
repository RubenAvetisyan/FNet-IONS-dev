import md5 from 'md5'
import { differenceInSeconds, format, max, startOfToday } from 'date-fns'
import { H3Error } from 'h3'
import { getPayments } from '~~/admin/utils/sync/getPaymentsFromLanBilling'

const formatToSqlDate = (date: Date) => {
  // console.log('date: ', date)
  return format(date, 'yyyy-MM-dd HH:mm:SS', { weekStartsOn: 1 })
}
// const formatToISO = (date: Date) => formatISO(date, { representation: 'complete', format: 'basic' })

let initial = true
let maxDate: Date = startOfToday()
console.info('maxDate: ', maxDate)
console.info('DIFFERENCE: ', differenceInSeconds(Date.now(), maxDate))

const TOKEN = '911f225af566b884fb3501132d65cb68'

const makePayment = async (LanBillingItem: LanBilling) => {
  await $fetch('/api/syncWithABilling', {
    method: 'POST',
    body: {
      data: LanBillingItem,
    },
  })
}
export default defineEventHandler(async () => {
  try {
    if (initial) {
      initial = false
      return []
    }

    console.info('get from LanBilling...')
    const response = await getPayments(formatToSqlDate(maxDate)) as PaymentsResponseType[] | H3Error | string

    if (response instanceof H3Error || typeof response === 'string')
      return response

    const dates: (number | Date)[] = []

    const mapedRes: LanBilling[] | any[] = []
    response.forEach(({ Amount, CONTRACT_ID, DtTime, TransactID, PaymentSystemName }) => {
      const diff = differenceInSeconds(DtTime, maxDate)
      // console.log('diff: ', diff)
      const Checksum = md5(TOKEN + CONTRACT_ID + Amount + TransactID)
      if (!Number.isNaN(diff) && diff > 0) {
        dates.push(DtTime)

        mapedRes.push({
          Inputs: [`${CONTRACT_ID || 0}`, '', '', ''],
          Amount: Amount || 0,
          TransactID: TransactID || 0,
          Currency: 'AMD',
          Checksum: Checksum || '',
          DtTime: DtTime || '',
          PaymentSystemName: PaymentSystemName || '',
        })
      }
    })

    maxDate = dates.length ? max(dates) : maxDate

    // console.log('exit from LanBilling...')
    let result = mapedRes.filter(s => s?.Inputs)

    if (result.length) {
      result = result.map(async (LanBillingItem: LanBilling) => {
        return makePayment(LanBillingItem)
      })
    }

    return result
  }
  catch (error) {
    console.error('error: ', error)
  }
})
