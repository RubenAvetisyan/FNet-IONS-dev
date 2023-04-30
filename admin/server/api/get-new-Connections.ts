import { DbName } from '../../../utils/MySQL/connection-class';
import { defineEventHandler, H3Error, readBody } from 'h3'
import { endOfDay, parseISO, startOfDay } from 'date-fns'
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { formatToSqlDate } from '@/utils/dateTime'
import { readSqlFile } from '~~/utils/readSQLFile'

type StringifiedFilterObject = string

enum SqlFilePaths {
  ERP_MIACMAN_PROCESS_COUNTS_EMPLOYE = '../../admin/assets/SQL/ERP/ERP_MIACMAN_PROCESS_COUNTS_EMPLOYE.sql',
  ERP_Customers = '../../admin/assets/SQL/ERP/ERP_Customers.sql',
  CONTRACTS_IN_DETAIL_BY_CONTRACT_NUMBERS_RANGE = '../../admin/assets/SQL/ABilling/CONTRACTS_IN_DETAIL_BY_CONTRACT_NUMBERS_RANGE.sql',
}

type ConnectionsResponse = {
  'Պայ\nմանա\nգիր №': string;
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
export default defineCachedEventHandler(async (event) => {
  try {
    const [connectionsQuery, contractsQuery, customersQuery] = await readSqlFile(
      SqlFilePaths.ERP_MIACMAN_PROCESS_COUNTS_EMPLOYE,
      SqlFilePaths.CONTRACTS_IN_DETAIL_BY_CONTRACT_NUMBERS_RANGE,
      SqlFilePaths.ERP_Customers
    ) as string

    const empConnections = await executeQuery<{
      count: number;
      employee: string;
      user_id: number;
      contractNumbers: string
    }>(connectionsQuery, DbName.ERP)

    const contractNumbers = empConnections.body.map(obj => obj.contractNumbers).join(',')

    const qs = contractsQuery.replace('contractNumbers', contractNumbers)
    const result = await executeQuery<ConnectionsResponse>(qs, DbName.A_BILLING)
    const customers = await executeQuery<Customers>(customersQuery.replace(`GROUP BY customer_link.object_title`, ` AND customer_link.object_title IN (${contractNumbers}) GROUP BY customer_link.object_title`), DbName.ERP)

    result.body = result.body.map(body => {
      const phone = customers.body.find(({ customerNumber }) => customerNumber == body['Պայ\nմանա\nգիր №'])?.phone || ''
      return { ...body, 'հեռախես': phone }
    })
    return result
  } catch (error: any) {
    createError(error.message)
  }
}, {
  maxAge: 60
})
