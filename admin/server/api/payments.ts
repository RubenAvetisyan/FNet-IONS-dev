import md5 from 'md5'
import { differenceInSeconds, formatISO, max, parseISO, startOfToday } from 'date-fns'
import { connection } from '@/admin/utils/bdConnect'
import { getPayments } from '@/admin/utils/sync/getPaymentsFromLanBilling'

let initial = true
let maxDate: string = formatISO(startOfToday(), { representation: 'complete', format: 'extended' })
console.log('maxDate: ', maxDate)
console.log('DIFFERENCE: ', differenceInSeconds(Date.now(), parseISO(maxDate)))

const TOKEN = '911f225af566b884fb3501132d65cb68'
type Response = {
  Amount: number
  CONTRACT_ID: number
  DtTime: string
  TransactID: number
  PaymentSystemName: string
}[]
export default defineEventHandler(async () => {
  try {
    if (initial) {
      initial = false
      return []
    }

    console.log('get from LanBilling...')
    const response = await getPayments(connection, maxDate) as Response

    const dates: (number | Date)[] = []

    const mapedRes = response.map(({ Amount, CONTRACT_ID, DtTime, TransactID, PaymentSystemName }) => {
      const diff = differenceInSeconds(parseISO(DtTime), parseISO(maxDate))
      console.log('diff: ', diff)
      if (diff <= 0)
        return {}

      const Checksum = md5(TOKEN + CONTRACT_ID + Amount + TransactID)
      dates.push(parseISO(DtTime))
      return {
        Inputs: [`${CONTRACT_ID}`, '', '', ''],
        Amount,
        TransactID,
        Currency: 'AMD',
        Checksum,
        DtTime,
        PaymentSystemName,
      }
    })

    maxDate = dates.length ? formatISO(max(dates)) : maxDate
    console.log('maxDate: ', maxDate)

    console.log('exit from LanBilling...')
    const result = mapedRes.filter(s => s.Inputs)

    return result
  } catch (error) {
    console.log('error: ', error);
  }
})
