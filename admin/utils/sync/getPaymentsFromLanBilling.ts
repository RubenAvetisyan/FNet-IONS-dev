import { H3Error, createError } from 'h3'
import { makeQuery } from '../query'
import { abilling, erp, lanbilling } from '~~/admin/utils/'

const db = {
  lanbilling,
  abilling,
  erp,
}

export const executeQuery = async <T>(queryString: string, paymentSystem: string): Promise<
  | T[]
  | H3Error
> => {
  try {
    const dbInstance = db[paymentSystem as 'lanbilling'] // await getBillingDb(paymentSystem)
    if (!dbInstance || dbInstance instanceof H3Error)
      return createError(`the ${paymentSystem} DB conncetion is faild`)

    const result = makeQuery<T>(queryString, dbInstance.connection)
    return result
  }
  catch (error) {
    return createError(JSON.stringify(error))
  }
}
