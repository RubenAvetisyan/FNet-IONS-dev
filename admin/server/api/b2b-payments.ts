import { executeQuery } from "~~/admin/utils/sync/getPaymentsFromLanBilling";
import { readSqlFile } from '~~/utils/readSQLFile'
import { DbName } from './../../../utils/MySQL/connection-class';
enum SqlFilePaths {
  ALL_PAYMENTS_B2B = '../../admin/assets/SQL/ABilling/ALL_PAYMENTS_B2B.sql'
}

export default defineCachedEventHandler(async () => {
  const queryString = await readSqlFile(SqlFilePaths.ALL_PAYMENTS_B2B) as string
  const result = await executeQuery<{ contractNumber: number, summa: number }>(queryString, DbName.A_BILLING)
  console.log('result: ', result);
  return result
})
