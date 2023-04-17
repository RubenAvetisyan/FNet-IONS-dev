import { DbName } from '../../../utils/MySQL/connection-class';
import { defineEventHandler, H3Error, readBody } from 'h3'
import { endOfDay, parseISO, startOfDay } from 'date-fns'
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { formatToSqlDate } from '@/utils/dateTime'
import { readSqlFile } from '~~/utils/readSQLFile'

enum SqlFilePaths {
  detailed_IN_contractNumbers = '../../admin/assets/SQL/ABilling/detailed_IN_contractNumbers.sql',
  ERP_Customers = '../../admin/assets/SQL/ERP/ERP_Customers.sql'
}

type FilterObject = { [key: string]: string }

type QueryObj = { filters: FilterObject[] } | undefined

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
    const q = (await readBody(event)) as QueryObj
    if (!q?.filters) return null

    const [requestQuery, customersQuery] = await readSqlFile(SqlFilePaths.detailed_IN_contractNumbers, SqlFilePaths.ERP_Customers) as string
    let queryString = requestQuery
    q.filters.forEach(filter => {
      queryString = queryString.replaceAll(filter.target, filter.value)
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
    return createError(error)
  }
})
