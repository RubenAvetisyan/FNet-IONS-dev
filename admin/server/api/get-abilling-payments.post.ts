import { defineEventHandler, readBody } from 'h3'
import { endOfDay, parseISO, startOfDay } from 'date-fns'
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { formatToSqlDate } from '@/utils/dateTime'
import { readSqlFile } from '~~/utils/readSQLFile'

const query = async (date: QueryDate) => {
  const dateFrom = formatToSqlDate(startOfDay(parseISO(date.dateFrom))) as string
  const dateTo = date.dateTo ? formatToSqlDate(endOfDay(parseISO(date.dateTo))) as string : 'now()'
  const qString = await readSqlFile('../../admin/assets/SQL/ABilling/received_payments_advanced.sql')
  return qString.replace('dateFrom', dateFrom).replace('dateTo', dateTo)
}

export default defineEventHandler(async (event) => {
  const { date, replacer } = await readBody<{ date: QueryDate; replacer?: [string, string] }>(event)
  const requestQuery = await query(date)
  const queryString = replacer ? requestQuery.replace(...replacer) : requestQuery
  const response = await executeQuery(queryString, 'abilling')

  return response
})
