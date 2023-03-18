import type MySQLConnection from '~~/utils/MySQL/connection-class'
import { QueryOptions } from '~~/utils/MySQL/connection-class'

export const makeQuery = async <T>(query: string, connection: MySQLConnection, options?: QueryOptions) => {
  return await connection.executeQuery<T>(query, options)
}
