import { defineEventHandler, H3Error } from 'h3'
import { z } from 'zod'
import { format, isDate, parseISO } from 'date-fns'
import { p } from '@antfu/utils'

import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { readSqlFile } from '~~/utils/readSQLFile'
import intersection from 'lodash.intersection'

const mustPaySchema = z.object({
  header: z.array(z.string()),
  body: z.array(
    z.object({
      street: z.string().optional().nullable(),
      contract: z.string().nullable(),
      balance: z.number().optional().nullable(),
      tariff: z.string().optional().nullable(),
      discount: z.string().optional().nullable(),
      totalCostTariff: z.string().optional().nullable(),
      discountEndDate: z.date().optional().nullable(),
      dayOfPayment: z.string().optional().nullable(),
      status: z.string().optional().nullable(),
    }).transform((data) => ({
      ...data,
      totalCostTariff: typeof data.totalCostTariff === 'string' ? parseFloat(data.totalCostTariff) : data.totalCostTariff,
      discountEndDate: !!data.discountEndDate && isDate(data.discountEndDate) ? format(data.discountEndDate, 'dd/MM/yyyy \n hh:mm') : data.discountEndDate,
      balance: typeof data.balance === 'string' ? +data.balance : data.balance,
      dayOfPayment: typeof data.dayOfPayment === 'string' ? parseFloat(data.dayOfPayment) : data.dayOfPayment,
    }
    ))
  ).nonempty()
})

const responeSchema = z.object({
  header: z.array(z.string()),
  body: z.array(z.object({
    contract: z.string().optional().nullable(),
    agreementDate: z.string().optional().nullable(),
    customerName: z.string().optional().nullable(),
    street: z.string().optional().nullable(),
    phone: z.string().optional().nullable().optional(),
    contractId: z.number().optional().nullable(),
    customerType: z.string().optional().nullable(),
    balance: z.number().optional().nullable(),
    tariff: z.string().optional().nullable(),
    discount: z.string().optional().nullable(),
    totalCostTariff: z.number().optional().nullable(),
    discountEndDate: z.string().optional().nullable(),
    dayOfPayment: z.number().optional().nullable(),
    status: z.string().optional().nullable(),
  }))
})

type MustPay = z.TypeOf<typeof mustPaySchema>;
type MustPayErpCustomer = z.TypeOf<typeof responeSchema>;

const mustPayCustomersQuerySrc = '../../admin/assets/SQL/ABilling/INES.sql'
const erpCustomersQuerySrc = '../../admin/assets/SQL/ERP/ERP_Customers.sql'

const map: Map<string, any> = new Map()


const getContractNumbers = async (passiveCustomers: {}[]) => Promise.all(passiveCustomers.map((obj: any) => {
  if (map)
    map.set(obj.contract, obj)

  return obj.contract
}))

async function getERPCustomers(erpCustomersQuerySrc: string, passiveCustomers: {}[]) {
  let contractNumbers: string | string[] = await getContractNumbers(passiveCustomers)
  contractNumbers = contractNumbers.join(',')

  let queryStringErpCustomers = await readSqlFile(erpCustomersQuerySrc)
  // await executeQuery(`SET @contractNumbers := '${contractNumbers}';`, 'erp');
  return executeQuery<ErpCustomers>(queryStringErpCustomers.replace('@contractNumbers', contractNumbers), 'erp')
}

const getResponse = async (erpCustomers: {}[]) => {
  return Promise.all(erpCustomers.map((customers: any) => {
    // customers.phone = customers.phone.split(',').join(', ')

    if (!map)
      return { ...customers }
    customers.phone = customers.phone ? intersection<string>(customers.phone.replace(/\s/gim, '').split(',')).filter(s => s).join(', ') : ''

    const fullObj = map.get(customers.contract)
    return { ...customers, ...fullObj }
  }))
}

export default defineEventHandler(async event => {
  try {
    map.clear()
    const queryStringmustPayCustomers = await readSqlFile(mustPayCustomersQuerySrc)
    const mustPayCustomers = await executeQuery(queryStringmustPayCustomers, 'abilling')
    if (mustPayCustomers instanceof H3Error) {
      console.error('mustPayCustomers: ', mustPayCustomers);
      return []
    }

    console.log('mustPayCustomers length: ', mustPayCustomers.body.length);

    const erpCustomers = await getERPCustomers(erpCustomersQuerySrc, mustPaySchema.parse(mustPayCustomers).body)
    console.log('erpCustomers: ', erpCustomers);
    if (erpCustomers instanceof H3Error) {
      throw erpCustomers
    }

    const body = await getResponse(erpCustomers.body)
    return { ...erpCustomers, body }
  } catch (error) {
    console.error('error: ', error);
  }
})
