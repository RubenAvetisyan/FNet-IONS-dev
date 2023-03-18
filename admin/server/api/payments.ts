import md5 from 'md5'
import { differenceInSeconds, format, max, parseISO, startOfToday, subDays } from 'date-fns'
import { H3Error, createError } from 'h3'
import async from 'async-es'

// import { formatToSqlDate } from '@/utils/dateTime'

// const formatToISO = (date: Date) => formatISO(date, { representation: 'complete', format: 'basic' })

let maxDate: Date = startOfToday()



const TOKEN = '911f225af566b884fb3501132d65cb68'

const makePayment = async (LanBillingItem: LanBilling): Promise<any> => {
  return new Promise(resolve => setTimeout(async () => {
    const res = await $fetch('/api/syncWithABilling', {
      method: 'POST',
      body: {
        data: LanBillingItem,
      },
    })

    
    resolve(res)
  }, 1000))
}
export default defineEventHandler(async () => {
  try {
    const abresponse: any[] = await $fetch('/api/get-abilling-payments', {
      method: 'POST',
      body: {
        date: {
          dateFrom: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
          dateTo: '',
        },
        replacer: ['11, 12, 13', '12'],
      },
    })

    const lastContract = abresponse[0]['Contract ID']
    

    
    const response: any[] | H3Error = await $fetch('/api/get-lanbilling-payments', {
      method: 'POST',
      body: {
        date: format(maxDate, 'yyyy-MM-dd'),
        lastContract,
      },
    })

    if (response instanceof H3Error || typeof response === 'string')
      return createError(JSON.stringify(response))

    // const dates: (number | Date)[] = []
    // const mapedRes: LanBilling[] | any[] = []

    const { dates, mapedRes } = responseHanler(response)
    maxDate = dates.length ? max(dates) : maxDate

    // 
    // let result = mapedRes //.filter(s => s?.Inputs)

    // if (result.length) {
    //   result = await PropmisifyResult(result)
    // }

    return mapedRes.length ? await PropmisifyResult(mapedRes) : []
  }
  catch (error) {
    
    return []
  }
})

async function PropmisifyResult(result: LanBilling[]) {
  try {
    const res = await new Promise((resolve: (r?: any) => any, reject) => {
      async.eachLimit(result, 8, async (item: any) => {
        return await makePayment(item)
      }, (err: TypeError, r?: any) => {
        if (err)
          reject(err)
        else
          resolve(r)
      })
    })
    
    return res
  }
  catch (error) {
    
    return []
  }
}

type Dates = (number | Date)[]
type MapedRes = LanBilling[]

interface ResponseHanlerParams {
  dates: Dates
  mapedRes: MapedRes
}

function responseHanler(response: PaymentsResponseType[]): ResponseHanlerParams {
  try {
    const dates: Dates = []
    const mapedRes: MapedRes = []

    response.forEach(({ Amount, CONTRACT_ID, DtTime, TransactID, PaymentSystemName }) => {
      const leftTime = typeof DtTime === 'string' ? parseISO(DtTime) : DtTime
      const diff = differenceInSeconds(leftTime, maxDate)
      // 
      const Checksum = md5(TOKEN + CONTRACT_ID + Amount + TransactID)
      if (!Number.isNaN(diff) && diff > 0 && CONTRACT_ID) {
        const transformedData = transformData({ Amount, CONTRACT_ID, DtTime: leftTime, TransactID, Checksum, PaymentSystemName })
        dates.push(leftTime)
        mapedRes.push(transformedData)
      }
    })

    return { dates, mapedRes }
  }
  catch (error) {
    
    return { dates: [Date.now()], mapedRes: [] }
  }
}

interface TransformData {
  CONTRACT_ID: number
  Amount: number
  TransactID: number
  Checksum: string
  DtTime: Date
  PaymentSystemName: string
}

function transformData<T extends TransformData>({ CONTRACT_ID, Amount, TransactID, Checksum, DtTime, PaymentSystemName }: T): LanBilling {
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
