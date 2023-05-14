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
      street: z.string(),
      contract: z.string(),
      balance: z.number(),
      tariff: z.string(),
      discount: z.string(),
      totalCostTariff: z.string(),
      discountEndDate: z.date(),
      dayOfPayment: z.string(),
      status: z.string(),
    })
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

const map: Map<string, any> = new Map()

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

    mustPayCustomers.body.forEach(mpc => map.set(mpc.contract, mpc))
    const contractNumbers = [...map.keys()]

    if (!contractNumbers.length) return null

    const erpCustomersQuery = queryStringErpCustomers.replace('GROUP BY customer_link.object_title', ` AND customer_link.object_title IN (${contractNumbers.join()}) GROUP BY customer_link.object_title`)
    const erpCustomers = await executeQuery<{
      customerNumber: string;
      customerName: string;
      customerType: string;
      phone: string;
      country: string;
      region: string;
      city: string;
      quarter: string;
      street: string;
      house: string;
    }>(erpCustomersQuery, DbName.ERP)

    if (erpCustomers instanceof H3Error) {
      throw erpCustomers
    }

    const body: (string | number | null | undefined)[][] = []

    erpCustomers.body.forEach((b) => {
      const mpc = map.get(b.customerNumber)


      if (mpc) {
        const mustPaymAmount = +mpc.totalCostTariff - mpc.balance
        body.push([
          mpc.contract,
          b.customerName,
          mpc.tariff,
          mpc.totalCostTariff,
          mpc.balance,
          mustPaymAmount,
          mpc.dayOfPayment,
          mpc.status,
          b.phone,
          b.country,
          b.region,
          b.city,
          b.quarter,
          b.street,
          b.house,
        ])
      }
    })

    return {
      header: [
        'Պայմանագրի #',
        'Անուն',
        'Սակագին',
        'Սկագնի\nարժեք',
        'Հաշվեկշիռ',
        'Վճարման\nենթակա\nգումար',
        'Վճարման\тօր',
        'Կարգա\nվիճակ',
        'Հեռախոս',
        'Երկիր',
        'Մարզ',
        'Քաղաք',
        'Տարածք',
        'Փողոց',
        'Տուն',
      ], body
    }
  } catch (error) {
    console.error('error: ', error);
  }
})
