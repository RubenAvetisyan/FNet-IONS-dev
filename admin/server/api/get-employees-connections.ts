import { DbName } from '../../../utils/MySQL/connection-class';
import { defineEventHandler, H3Error, readBody } from 'h3'
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
export default defineEventHandler(async (event) => {
  try {
    const [connectionsQuery, contractsQuery] = await readSqlFile(
      SqlFilePaths.ERP_MIACMAN_PROCESS_COUNTS_EMPLOYE,
      SqlFilePaths.CONTRACTS_IN_DETAIL_BY_CONTRACT_NUMBERS_RANGE
    ) as string

    let result = null
    if (getMethod(event) === 'POST') {
      const body = await readBody(event)
      console.log('body?.contractNumbers: ', body?.contractNumbers);
      if (body?.contractNumbers) {
        const qs = contractsQuery.replace('contractNumbers', body.contractNumbers)
        result = await executeQuery(qs, DbName.A_BILLING)
      }
    }
    else {
      result = await executeQuery<{
        count: number;
        employee: string;
        user_id: number;
        contractNumbers: string
      }>(connectionsQuery, DbName.ERP)
    }
    // const CONTRACTS_IN_DETAIL_BY_CONTRACT_NUMBERS_RANGE = await executeQuery(contractsQuery.replace('contractNumbers',), DbName.A_BILLING)

    return result
  } catch (error: any) {
    createError(error.message)
  }
})
