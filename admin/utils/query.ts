import type MySQLConnection from '~~/utils/MySQL/connection-class'

export const makeQuery = async <T>(query: string, connection: MySQLConnection): Promise<T[]> => {
  return await connection.executeQuery(query)
}
