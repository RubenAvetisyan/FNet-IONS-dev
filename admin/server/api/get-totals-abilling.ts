import { H3Error } from 'h3';
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling';
import { readSqlFile } from '~~/utils/readSQLFile'
import { p as myPromise, p } from '@antfu/utils';

enum SqlFilePaths {
  ACTIVE = '../../admin/assets/SQL/ABilling/ACTIVE_CLIENTS.sql',
  PASSIVE = '../../admin/assets/SQL/ABilling/PASSIVE_CLIENTS.sql',
  ALL = '../../admin/assets/SQL/ABilling/ALL_CLIENTS.sql'
}

enum QueryType {
  ALL = 'all',
  ACTIVE = 'active',
  PASSIVE = 'passive'
}

function getSqlQueryStringFilePath(queryType: QueryType): string {
  let sqlFilePath = '';
  switch (queryType) {
    case QueryType.ACTIVE:
      sqlFilePath = SqlFilePaths.ACTIVE;
      break;
    case QueryType.PASSIVE:
      sqlFilePath = SqlFilePaths.PASSIVE;
      break;
    case QueryType.ALL:
      sqlFilePath = SqlFilePaths.ALL;
      break;
    default:
      throw new Error(`Unsupported query type: ${queryType}`);
  }

  return sqlFilePath;
}

export default defineEventHandler(async (event) => {
  try {
    // const { status } = getQuery(event) as { status: QueryType }
    // console.log('status: ', status);

    // const queryFileSrc = getSqlQueryStringFilePath(status)

    const items = [SqlFilePaths.ALL, SqlFilePaths.ACTIVE, SqlFilePaths.PASSIVE]

    const sqlFiles: string[] = await myPromise(items.map(readSqlFile))

    type Data = { contractBumber: string, clientName: string }[]
    const sqlQueries = sqlFiles.map(sqlFile => async () => {
      try {
        return await executeQuery<Data>(sqlFile, 'abilling')
      } catch (error: any) {
        throw new Error(error || '')
      }
    })
    const result = await myPromise(sqlFiles.map(sqlFile => executeQuery<Data>(sqlFile, 'abilling'))).filter(item => !(item instanceof H3Error))

    return result
  } catch (error) {
    console.log('error: ', error);
    if (error instanceof Error)
      return createError(error)
    return 'something goes wrong'
  }
})
