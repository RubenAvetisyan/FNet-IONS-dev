import md5 from 'md5'
import { differenceInSeconds, format, formatISO, max, parseISO, startOfToday } from 'date-fns'
import { connection } from '~~/admin/utils/bdConnect'
import { getPayments } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import type { LanBilling, ResponseType } from '~~/nuxt'

const formatToSqlDate = (date: Date) => format(date, 'yyyy-MM-dd HH:mm:SS')
const formatToISO = (date: Date) => formatISO(date, { representation: 'complete', format: 'basic' })

let initial = true
let maxDate: string = formatToSqlDate(startOfToday())
console.log('maxDate: ', maxDate)
console.log('DIFFERENCE: ', differenceInSeconds(Date.now(), parseISO(maxDate)))

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

    console.log('get from LanBilling...')
    const response = await getPayments(connection, maxDate) as ResponseType[]

    const dates: (number | Date)[] = []

    const mapedRes = response.map(({ Amount, CONTRACT_ID, DtTime, TransactID, PaymentSystemName }) => {
      const diff = differenceInSeconds(parseISO(DtTime), parseISO(maxDate))
      console.log('diff: ', diff)
      if (diff <= 0)
        return undefined

      const Checksum = md5(TOKEN + CONTRACT_ID + Amount + TransactID)
      dates.push(parseISO(DtTime))
      return {
        Inputs: [`${CONTRACT_ID || 0}`, '', '', ''],
        Amount: Amount || 0,
        TransactID: TransactID || 0,
        Currency: 'AMD',
        Checksum: Checksum || '',
        DtTime: DtTime || '',
        PaymentSystemName: PaymentSystemName || '',
      }
    }) as LanBilling[] | any[]

    maxDate = dates.length ? formatISO(max(dates)) : maxDate
    console.log('maxDate: ', maxDate)

    console.log('exit from LanBilling...')
    let result = mapedRes.filter(s => s.Inputs)

    if (result.length) {
      result = result.map(async (LanBillingItem: LanBilling) => {
        return makePayment(LanBillingItem)
      })
    }

    return result
  }
  catch (error) {
    console.log('error: ', error)
  }
})
