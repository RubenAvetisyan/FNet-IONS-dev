import { QueryOptions } from '~~/utils/MySQL/connection-class'
import { H3Error, createError } from 'h3'
import { makeQuery } from '../query'
import { abilling, erp, lanbilling } from '~~/admin/utils/'
import { FieldInfo } from 'mysql'

const db = {
  lanbilling,
  abilling,
  erp,
}

export const executeQuery = async <T>(queryString: string, paymentSystem: string, options?: QueryOptions): Promise<
  | {
    header: string[] | [];
    body: T[];
    FieldPackets: FieldInfo[] | undefined;
  }
  | H3Error
> => {
  try {
    const dbInstance = db[paymentSystem as 'lanbilling'] // await getBillingDb(paymentSystem)
    if (!dbInstance || dbInstance instanceof H3Error)
      return createError(`the ${paymentSystem} DB conncetion is faild`)

    const result = makeQuery<T>(queryString, dbInstance.connection, options)
    return result
  }
  catch (error) {
    return createError(JSON.stringify(error))
  }
}
