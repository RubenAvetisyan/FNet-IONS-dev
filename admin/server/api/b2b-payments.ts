import { executeQuery } from "~~/admin/utils/sync/getPaymentsFromLanBilling";
import { readSqlFile } from '~~/utils/readSQLFile'
import { DbName } from './../../../utils/MySQL/connection-class';
enum SqlFilePaths {
  ALL_PAYMENTS_B2B = '../../admin/assets/SQL/ABilling/ALL_PAYMENTS_B2B.sql'
}

export default defineEventHandler(async () => {
  const queryString = await readSqlFile(SqlFilePaths.ALL_PAYMENTS_B2B) as string
  const result = await executeQuery<{
    contractNumber: number,
    tariff: string;
    summa: number
  }>(queryString, DbName.A_BILLING)
  // console.log('result: ', JSON.stringify(result, null, 2));
  return result
})
