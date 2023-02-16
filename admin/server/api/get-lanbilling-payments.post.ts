import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { readSql } from '~~/utils/readSQLFile'

const filePath = '../../admin/assets/SQL/Get_payments_by_last_contract.sql'

export default defineEventHandler(async (event) => {
  const { lastContract } = await readBody(event)
  // const lastContartDateQuery = `(select pay_date from billing.vgroups as c join billing.payments as p on p.agrm_id = c.agrm_id where login = "${lastContract}" order by pay_date desc limit 1)`
  let queryString = readSql(filePath)
  queryString = queryString.replace('?', lastContract).replace('13, 14, 94', '94')
  const response = await executeQuery(queryString, 'lanbilling')

  return response
})
