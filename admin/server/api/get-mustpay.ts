import { DbName } from './../../../utils/MySQL/connection-class';
import { defineEventHandler, H3Error } from 'h3'
import { z } from 'zod'
import { format, isDate, parseISO } from 'date-fns'
import { uniq, clearUndefined, p as P } from '@antfu/utils'

import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { readSqlFile } from '~~/utils/readSQLFile'
import intersection from 'lodash.intersection'

enum SqlFilePaths {
  INES = '../../admin/assets/SQL/ABilling/INES.sql',
  ERP_Customers = '../../admin/assets/SQL/ERP/ERP_Customers.sql'
}

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

const b = z.object({
  contract: z.string(),
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
})
const responeSchema = z.object({
  header: z.array(z.string()),
  body: z.array(b)
})

type MustPay = z.TypeOf<typeof mustPaySchema>;
type MustPayErpCustomer = z.TypeOf<typeof responeSchema>;

const map: Map<string, z.TypeOf<typeof b>> = new Map()


const getContractNumbers = (passiveCustomers: z.TypeOf<typeof b>) => {
  if (map && passiveCustomers.contract)
    map.set(passiveCustomers.contract, passiveCustomers)

  return passiveCustomers.contract
}

async function getERPCustomers(erpCustomersQuerySrc: string, passiveCustomers: MustPay['body']) {
  if (!erpCustomersQuerySrc) throw createError('erpCustomersQuerySrc not defined in function "getERPCustomers"')

  let contractNumbers = passiveCustomers.map(getContractNumbers).filter(s => typeof s === 'string' && s.length) as string[]

  contractNumbers = uniq(contractNumbers)

  // await executeQuery(`SET @contractNumbers := '${contractNumbers}';`, 'erp');
  return executeQuery<ErpCustomers>(erpCustomersQuerySrc.replace('@contractNumbers', contractNumbers.join(',')), DbName.ERP)
}

const getResponse = async (erpCustomers: ErpCustomers): Promise<ErpCustomers['body']> => await P(erpCustomers.body, { concurrency: 12 }).map((customers) => {
  // customers.phone = customers.phone.split(',').join(', ')

  if (!map)
    return { ...customers }
  customers.phone = customers.phone ? clearUndefined(uniq(intersection<string>(customers.phone.replace(/\s/gim, '').split(',')))).join(', ') : ''

  const fullObj = map.get(customers.contract)
  const result = { ...customers, ...fullObj }
  return result
})

export default defineEventHandler(async event => {
  try {
    map.clear()

    const items = await readSqlFile(SqlFilePaths.INES, SqlFilePaths.ERP_Customers) as string[]
    const [queryStringmustPayCustomers, queryStringErpCustomers] = items

    const mustPayCustomers = await executeQuery<MustPay['body'][0]>(queryStringmustPayCustomers, DbName.A_BILLING)

    if (mustPayCustomers instanceof H3Error) {
      console.error('mustPayCustomers: ', mustPayCustomers);
      return []
    }

    const erpCustomers = await getERPCustomers(queryStringErpCustomers, mustPayCustomers.body)

    if (erpCustomers instanceof H3Error) {
      throw erpCustomers
    }

    const body = await getResponse(erpCustomers)
    return { ...erpCustomers, body }
  } catch (error) {
    console.error('error: ', error);
  }
})
