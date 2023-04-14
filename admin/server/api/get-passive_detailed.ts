import { DbName } from '../../../utils/MySQL/connection-class';
import { defineEventHandler, H3Error, readBody } from 'h3'
import { endOfDay, parseISO, startOfDay } from 'date-fns'
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { formatToSqlDate } from '@/utils/dateTime'
import { readSqlFile } from '~~/utils/readSQLFile'

enum SqlFilePaths {
  ERP_Customers = '../../admin/assets/SQL/ERP/ERP_Customers.sql'
}

type StringifiedFilterObject = string

type QueryObj = { filters: StringifiedFilterObject[] } | undefined

type ConnectionsResponse = {
  contractNumber: string;
  Контрагент: string;
  tariff: string;
  connection_date: Date;
  price: string;
  balance: number;
  pay_dt_by_tariff: string;
  last_pay_dt: string;
  summa: number;
  status: string;
  address: string;
}

type Customers = {
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
  dt: Date
  aggrimentDate: Date
}
export default defineEventHandler(async (event) => {
  try {
    const q = getQuery(event) as QueryObj
    if (!q?.filters) return null

    console.log('filters: ', q.filters);
    const [requestQuery, customersQuery] = await readSqlFile('../../admin/assets/SQL/ABilling/detailed_passive_address.sql', SqlFilePaths.ERP_Customers) as string
    let queryString = requestQuery
    q.filters.forEach(filter => {
      const parsedFilter = JSON.parse(filter)
      queryString = queryString.replaceAll(`%${parsedFilter.target}%`, `%${parsedFilter.value}%`)
    })

    const response = await executeQuery<ConnectionsResponse>(queryString, DbName.A_BILLING)
    const customers = await executeQuery<Customers>(customersQuery, DbName.ERP)

    response.body = response.body.map(body => {
      const phone = customers.body.find(({ customerNumber }) => customerNumber === body.contractNumber)?.phone || ''
      return { ...body, phone }
    })

    if (response instanceof H3Error) {
      console.log('response: ', response);
      return createError(response)
    }

    return response
  } catch (error: any) {
    console.log('error.message: ', error.message);
    createError(error)
  }
})
