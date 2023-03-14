import { defineEventHandler, H3Error } from 'h3'
import { z } from 'zod'
import { format, isDate, parseISO } from 'date-fns'
import { p } from '@antfu/utils'

import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { readSqlFile } from '~~/utils/readSQLFile'

const mustPaySchema = z.array(
  z.object({
    contract: z.string(),
    balance: z.number(),
    tariff: z.string().optional(),
    discount: z.string().optional(),
    totalCostTariff: z.string().optional(),
    discountEndDate: z.date().optional().nullable(),
    dayOfPayment: z.string(),
    status: z.string(),
  }).transform((data) => ({
    ...data,
    totalCostTariff: typeof data.totalCostTariff === 'string' ? parseFloat(data.totalCostTariff) : data.totalCostTariff,
    discountEndDate: !!data.discountEndDate && isDate(data.discountEndDate) ? format(data.discountEndDate, 'dd/MM/yyyy \n hh:mm') : data.discountEndDate,
    balance: typeof data.balance === 'string' ? +data.balance : data.balance,
    dayOfPayment: typeof data.dayOfPayment === 'string' ? parseFloat(data.dayOfPayment) : data.dayOfPayment,
  }))
).nonempty()

const erpCustomersSchema = z.array(z.object({
  contract: z.string(),
  agreementDate: z.string().optional(),
  customerName: z.string(),
  phone: z.string().nullable().optional(),
  contractId: z.number(),
  customerType: z.string(),
  payDay: z.string(),
})).nonempty();

const responeSchema = z.array(z.object({
  contract: z.string(),
  agreementDate: z.string().optional(),
  customerName: z.string(),
  phone: z.string().nullable().optional(),
  contractId: z.number(),
  customerType: z.string(),
  payDay: z.string(),
  balance: z.number(),
  tariff: z.string().optional(),
  discount: z.string().optional(),
  totalCostTariff: z.number().optional(),
  discountEndDate: z.string().optional().nullable(),
  dayOfPayment: z.number(),
  status: z.string(),
}))

type MustPay = z.TypeOf<typeof mustPaySchema>;
type ErpCustomers = z.TypeOf<typeof erpCustomersSchema>;
type MustPayErpCustomer = z.TypeOf<typeof responeSchema>;

const mustPayCustomersQuerySrc = '../../admin/assets/SQL/ABilling/INES.sql'
const erpCustomersQuerySrc = '../../admin/assets/SQL/ERP/ERP_Customers.sql'

const map: Map<string, any> = new Map()


const getContractNumbers = (passiveCustomers: MustPay) => passiveCustomers.map((obj) => {
  if (map)
    map.set(obj.contract, obj)

  return obj.contract
}).filter(s => !!s)

async function getERPCustomers(erpCustomersQuerySrc: string, passiveCustomers: MustPay) {
  const contractNumbers = getContractNumbers(passiveCustomers)
  console.log('contractNumbers: ', contractNumbers[0]);

  let queryStringErpCustomers = await readSqlFile(erpCustomersQuerySrc)
  queryStringErpCustomers = queryStringErpCustomers.replace('contractNumbers', contractNumbers.join(','))
  return executeQuery<ErpCustomers>(queryStringErpCustomers, 'erp')
}

const getResponse = async (erpCustomers: ErpCustomers) => {
  return await Promise.all(erpCustomers.map((customers) => {
    // customers.phone = customers.phone.split(',').join(', ')

    if (!map)
      return { ...customers }

    // customers.phone = intersection<string>(customers.phone.replace(/\s/gim, '').split(',')).filter(s => s).join(', ')

    const fullObj = map.get(customers.contract)
    return { ...customers, ...fullObj }
  }))
}

export default defineCachedEventHandler(async event => {
  map.clear()
  const queryStringmustPayCustomers = await readSqlFile(mustPayCustomersQuerySrc)

  const mustPayCustomers = await executeQuery(queryStringmustPayCustomers, 'abilling')

  const erpCustomers = await getERPCustomers(erpCustomersQuerySrc, mustPaySchema.parse(mustPayCustomers))
  if (erpCustomers instanceof H3Error) {
    console.error('erpCustomers: ', erpCustomers);
    return []
  }

  const respone = await getResponse(erpCustomersSchema.parse(erpCustomers)) as { [key: string]: any }[]
  return responeSchema.parse(respone)
})
