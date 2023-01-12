import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path'
import { getPayments } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { readSql } from '~~/utils/readSQLFile'

const dir = import.meta.url

const filePath = path.resolve(dirname(fileURLToPath(dir)), '../../admin/assets/SQL/Get_payments_by_last_contract.sql')

export default defineEventHandler(async (event) => {
  let { lastContract } = await readBody(event)
  const lastContartDateQuery = `(select pay_date from billing.vgroups as c join billing.payments as p on p.agrm_id = c.agrm_id where login = "${lastContract}" order by pay_date desc limit 1)`
  let queryString = readSql(filePath)
  queryString = queryString.replace('?', lastContract)
  const response = await getPayments(queryString, 'lanbilling')

  return response
})