import { QueryOptions, DbName } from '@/utils/MySQL/connection-class'
import { H3Error, createError } from 'h3'
import { makeQuery } from '../query'
import { abilling, erp, lanbilling } from '~~/admin/utils/'
import { FieldInfo } from 'mysql'

const db = {
  lanbilling,
  abilling,
  erp,
}

type BodyType = { [key: string]: string | number | boolean | Date | null }

export const executeQuery = async <T>(queryString: string, databaseName: DbName, options?: QueryOptions): Promise<{
  header: string[];
  body: T[];
  FieldPackets: FieldInfo[] | undefined;
}> => {
  try {
    const dbInstance = db[databaseName] // await getBillingDb(paymentSystem)
    if (!dbInstance)
      throw createError(`the ${databaseName} DB conncetion is faild`)
    if (dbInstance instanceof H3Error) throw dbInstance

    const result = makeQuery<T>(queryString, dbInstance.connection, options)
    return result
  }
  catch (error) {
    throw error
  }
}
