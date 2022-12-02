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

const makePayment = async (LanBillingItem: LanBilling): Promise<any> => {
  return await $fetch('/api/syncWithABilling', {
    method: 'POST',
    body: {
      data: LanBillingItem,
    },
  })
}
export default defineEventHandler(async () => {
  try {
    // if (initial) {
    //   initial = false
    //   return []
    // }

    console.info('get from LanBilling...')
    const response = await getPayments(formatToSqlDate(maxDate))

    if (response instanceof H3Error || typeof response === 'string')
      return response

    // const dates: (number | Date)[] = []
    // const mapedRes: LanBilling[] | any[] = []

    const { dates, mapedRes } = responseHanler(response)
    maxDate = dates.length ? max(dates) : maxDate

    // console.log('exit from LanBilling...')
    // let result = mapedRes //.filter(s => s?.Inputs)

    // if (result.length) {
    //   result = await PropmisifyResult(result)
    // }

    return mapedRes.length ? await PropmisifyResult(mapedRes) : []
  }
  catch (error) {
    console.error('error: ', error)
  }
})

async function PropmisifyResult(result: LanBilling[]) {
  return Promise.all(result.map(async (LanBillingItem) => {
    return makePayment(LanBillingItem)
  }))
}

type Dates = (number | Date)[]
type MapedRes = LanBilling[]

interface ResponseHanlerParams {
  dates: Dates
  mapedRes: MapedRes
}

function responseHanler(response: PaymentsResponseType[]): ResponseHanlerParams {
  const dates: Dates = []
  const mapedRes: MapedRes = []

  response.forEach(({ Amount, CONTRACT_ID, DtTime, TransactID, PaymentSystemName }) => {
    const diff = differenceInSeconds(DtTime, maxDate)
    // console.log('diff: ', diff)
    const Checksum = md5(TOKEN + CONTRACT_ID + Amount + TransactID)
    if (!Number.isNaN(diff) && diff > 0 && CONTRACT_ID) {
      const transformedData = transformData({ Amount, CONTRACT_ID, DtTime, TransactID, Checksum, PaymentSystemName })
      dates.push(DtTime)
      mapedRes.push(transformedData)
    }
  })

  return { dates, mapedRes }
}

interface TransformData {
  CONTRACT_ID: number;
  Amount: number;
  TransactID: number;
  Checksum: string;
  DtTime: Date;
  PaymentSystemName: string;
}

function transformData<T extends TransformData>
  ({ CONTRACT_ID, Amount, TransactID, Checksum, DtTime, PaymentSystemName }: T): LanBilling {
  return {
    Inputs: [`${CONTRACT_ID || 0}`, '', '', ''],
    Amount: Amount || 0,
    TransactID: TransactID || 0,
    Currency: 'AMD',
    Checksum: Checksum || '',
    DtTime: DtTime || '',
    PaymentSystemName: PaymentSystemName || '',
  }
}
