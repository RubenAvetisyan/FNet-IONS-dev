import { H3Error } from 'h3';
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling';
import { readSqlFile } from '~~/utils/readSQLFile'
import { p as myPromise, p } from '@antfu/utils';

enum SqlFilePaths {
  ACTIVE = '../../admin/assets/SQL/ABilling/ACTIVE_CLIENTS.sql',
  PASSIVE = '../../admin/assets/SQL/ABilling/PASSIVE_CLIENTS.sql',
  ALL = '../../admin/assets/SQL/ABilling/ALL_CLIENTS.sql',
  PAYMENTS = '../../admin/assets/SQL/ABilling/payment_cid_summa_by_date.sql'
}

export default defineEventHandler(async (event) => {
  try {

    const items = [SqlFilePaths.ALL, SqlFilePaths.ACTIVE, SqlFilePaths.PASSIVE]

    const sqlFiles: string[] = await myPromise(items.map(readSqlFile), { concurrency: 3 })
    const [paymentsSQLFiles]: any[] = await myPromise([readSqlFile(SqlFilePaths.PAYMENTS)])
    console.log('paymentsSQLFiles: ', paymentsSQLFiles);

    type Data = { contractBumber: string, clientName: string }[]
    const result: any = await myPromise(sqlFiles.map(sqlFile => executeQuery<Data>(sqlFile, 'abilling'))).filter(item => !(item instanceof H3Error))

    let contractNumbersArray: string[][] = await myPromise(result.map((res: any) => {
      return res.body.map(({ contractNumber }: any) => contractNumber)
    }), { concurrency: 3 })

    const paymentsResult: any[] = await myPromise(contractNumbersArray.map(async contractNumbers => {
      const queryString = paymentsSQLFiles.replace('@contractNumber', contractNumbers.join(','))
      return await executeQuery(queryString, 'abilling')
    }), { concurrency: 3 })

    console.log('paymentsResult: ', paymentsResult[0].header);
    return [...result, ...paymentsResult]

  } catch (error) {
    console.log('error: ', error);
    if (error instanceof Error)
      return createError(error)
    return 'something goes wrong'
  }
})
