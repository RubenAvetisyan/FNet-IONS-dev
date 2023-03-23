import { defineEventHandler, H3Error } from 'h3'
import { z } from 'zod'
import { format, isDate, parseISO } from 'date-fns'
import { clearUndefined, p as P, uniq } from '@antfu/utils'

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
  }))
})

type MustPay = z.TypeOf<typeof mustPaySchema>;
type MustPayErpCustomer = z.TypeOf<typeof responeSchema>;

const abillingCustomersQuerySrc = '../../admin/assets/SQL/ABilling/conragent_tariff_action_status_address.sql'
const erpCustomersQuerySrc = '../../admin/assets/SQL/ERP/ERP_Customers.sql'

const map: Map<string, MustPay['body'][0]> = new Map()


const getContractNumbers = (passiveCustomers) => {
  if (map && passiveCustomers.contract)
    map.set(passiveCustomers.contract, passiveCustomers)

  return passiveCustomers.contract
}

async function getERPCustomers(erpCustomersQuerySrc: string, passiveCustomers) {
  let contractNumbers: string | string[] = passiveCustomers.map(getContractNumbers)
  contractNumbers = uniq(contractNumbers).join(',')

  // await executeQuery(`SET @contractNumbers := '${contractNumbers}';`, 'erp');
  return executeQuery<ErpCustomers>(erpCustomersQuerySrc.replace('@contractNumbers', contractNumbers), 'erp')
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
    const p = P()
    p.add(readSqlFile(abillingCustomersQuerySrc))
    p.add(readSqlFile(erpCustomersQuerySrc))

    // const queryStringAbillingCustomers = await readSqlFile(abillingCustomersQuerySrc)
    // const queryStringErpCustomers = await readSqlFile(erpCustomersQuerySrc)
    const items: string[] = await p
    const [queryStringAbillingCustomers, queryStringErpCustomers] = items

    const abillingCustomers = await executeQuery(queryStringAbillingCustomers, 'abilling');

    if (abillingCustomers instanceof H3Error) {
      console.error('abillingCustomers: ', abillingCustomers);
      return []
    }

    const erpCustomers = await getERPCustomers(queryStringErpCustomers, abillingCustomers.body)

    if (erpCustomers instanceof H3Error) {
      throw erpCustomers
    }

    const body = await getResponse(erpCustomers)
    return { ...erpCustomers, body }
  } catch (error) {
    console.error('error: ', error);
    return error
  }
})
