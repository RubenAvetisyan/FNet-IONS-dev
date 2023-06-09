import { DbName } from '@/utils/MySQL/connection-class';
import { defineEventHandler, H3Error } from 'h3'
import intersection from 'lodash.intersection'
import { connection } from '@/admin/utils/ABilling/abilling-connection';
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { readSqlFile } from '~~/utils/readSQLFile'

enum SqlFilePathsP {
  PASSIVE_CLIENTS = '../../admin/assets/SQL/ABilling/PASSIVE_CLIENTS.sql',
  Tariffs = '../../admin/assets/SQL/ABilling/Tariffs.sql',
  FINAL_PAYMENTS = '../../admin/assets/SQL/ABilling/FINAL_PAYMENTS.sql',
  ERP_Customers = '../../admin/assets/SQL/ERP/ERP_Customers.sql',
}
const map: Map<string, any> = new Map()


const getContractNumbers = async (passiveCustomers: {}[]) => Promise.all(passiveCustomers.map((obj: any) => {
  if (map)
    map.set(obj.contractNumber, obj)

  return obj.contractNumber
}))
async function getERPCustomers(ERP_Customers: string, passiveCustomers: {}[]) {
  let contractNumbers: string | string[] = await getContractNumbers(passiveCustomers)
  contractNumbers = contractNumbers.join(',')

  let queryStringErpCustomers = await readSqlFile(ERP_Customers) as string
  // await executeQuery('SET @contractNumbers := null', 'erp');
  queryStringErpCustomers = queryStringErpCustomers.replace('@contractNumbers', contractNumbers)
  return executeQuery<ErpCustomers>(queryStringErpCustomers, DbName.ERP)
}

const getResponse = async (erpCustomers: {}[]) => {
  return Promise.all(erpCustomers.map((customers: any) => {
    // customers.phone = customers.phone.split(',').join(', ')

    if (!map)
      return { ...customers }
    customers.phone = customers.phone ? intersection<string>(customers.phone.replace(/\s/gim, '').split(',')).filter(s => s).join(', ') : ''

    const fullObj = map.get(customers.contractNumber)
    const result: any = {}

    Object.entries(customers).forEach(([k, v]) => {
      if (fullObj && k in fullObj) {
        result[k] = fullObj[k]
      } else {
        result[k] = customers[k]
      }
    })
    return result
  }))
}

export default defineEventHandler(async () => {
  map.clear()
  const connectionId = await connection.getConnectionThreadId()
  console.log('connectionId: ', connectionId);
  const [queryStringPassiveCustomers,
    queryStringCustomersTariffsQuerySrc,
    queryStringCustomersFinalPaymentsQuerySrc
  ] = await readSqlFile(SqlFilePathsP.PASSIVE_CLIENTS, SqlFilePathsP.Tariffs, SqlFilePathsP.FINAL_PAYMENTS)

  const passiveCustomers = await executeQuery(queryStringPassiveCustomers, DbName.A_BILLING) as any
  const erpCustomers = await getERPCustomers(SqlFilePathsP.ERP_Customers, passiveCustomers.body)

  if (erpCustomers instanceof H3Error) throw erpCustomers
  const cstomerTariffs = await executeQuery(queryStringCustomersTariffsQuerySrc, DbName.A_BILLING) as any
  const cstomerTFinalPayments = await executeQuery(queryStringCustomersFinalPaymentsQuerySrc, DbName.A_BILLING) as any

  const body = await getResponse(erpCustomers.body)
  erpCustomers.header.push('traiffGroup')
  erpCustomers.header.push('traiff')
  erpCustomers.header.push('finalPayments')


  cstomerTariffs.body.forEach((obj: any) => {
    body.forEach((main) => {
      if (main.contractNumber === obj.contractNumber) {
        main.traiffGroup = obj.tariff_group
        main.traiff = obj.tariff
      }
    })
  })

  cstomerTFinalPayments.body.forEach((obj: any) => {
    body.forEach((main) => {
      if (main.contractNumber === obj.contractNumber) {
        main.finalPayments = obj.final_payment
      }
    })
  })

  connection.reconnect()
  const result = { ...erpCustomers, body }
  return result
})
