import { defineEventHandler, H3Error } from 'h3'
import intersection from 'lodash.intersection'
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { readSqlFile } from '~~/utils/readSQLFile'

const passiveCustomersQuerySrc = '../../admin/assets/SQL/ABilling/get_passive_customers.sql'
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
  await executeQuery('SET @contractNumbers := ?', 'erp');
  queryStringErpCustomers = queryStringErpCustomers.replace('@contractNumbers := null', `@contractNumbers := ( ${contractNumbers} )`)
  return executeQuery<ErpCustomers>(queryStringErpCustomers, 'erp')
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

export default defineEventHandler(async () => {
  map.clear()
  const queryStringPassiveCustomers = await readSqlFile(passiveCustomersQuerySrc)
  const passiveCustomers = await executeQuery(queryStringPassiveCustomers, 'abilling') as any
  const erpCustomers = await getERPCustomers(erpCustomersQuerySrc, passiveCustomers.body)

  if (erpCustomers instanceof H3Error) throw erpCustomers

  console.log('erpCustomers: ', erpCustomers.body[0]);
  return []
  // const respone = await getResponse(erpCustomers)
  // return respone
})
