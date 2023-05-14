import { DbName } from '../../../utils/MySQL/connection-class';
import { defineEventHandler, H3Error, readBody, H3Event } from 'h3'
import { endOfDay, parseISO, startOfDay } from 'date-fns'
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { formatToSqlDate } from '@/utils/dateTime'
import { readSqlFile } from '~~/utils/readSQLFile'

type StringifiedFilterObject = string

enum SqlFilePaths {
  ERP_MIACMAN_PROCESS_COUNTS_EMPLOYE = '../../admin/assets/SQL/ERP/ERP_MIACMAN_PROCESS_COUNTS_EMPLOYE.sql',
  CONTRACTS_IN_DETAIL_BY_CONTRACT_NUMBERS_RANGE = '../../admin/assets/SQL/ABilling/CONTRACTS_IN_DETAIL_BY_CONTRACT_NUMBERS_RANGE.sql'
}

type QueryObj = { filters: StringifiedFilterObject[] } | undefined
type Connections = {
  count: number;
  employee: string;
  user_id: number;
  contractNumbers: string
}
type ConnectedConracts = {}
type Result<T extends boolean> = {
  header: string[],
  body: T extends true ? ConnectedConracts : Connections
}
export default defineEventHandler(async (event) => {
  try {
    const [connectionsQuery, contractsQuery] = await readSqlFile(
      SqlFilePaths.ERP_MIACMAN_PROCESS_COUNTS_EMPLOYE,
      SqlFilePaths.CONTRACTS_IN_DETAIL_BY_CONTRACT_NUMBERS_RANGE
    ) as string

    if (getMethod(event) === 'POST') {
      const body = await readBody(event)

      if (body?.contractNumbers) {
        const qs = contractsQuery.replace('contractNumbers', body.contractNumbers)
        return await executeQuery<ConnectedConracts>(qs, DbName.A_BILLING)
      }
    } else {
      const { date } = getQuery(event) as { date: string }
      console.log('date: ', date);
      const query = !date ? connectionsQuery : connectionsQuery.replace('NOW()', `'${date}'`)
      return await executeQuery<Connections>(query, DbName.ERP)
    }
    // const CONTRACTS_IN_DETAIL_BY_CONTRACT_NUMBERS_RANGE = await executeQuery(contractsQuery.replace('contractNumbers',), DbName.A_BILLING)
  } catch (error: any) {
    throw createError(error.message)
  }
})
