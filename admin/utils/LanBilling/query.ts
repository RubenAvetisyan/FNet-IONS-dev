import type { Connection } from 'mysql'

export const getQuery = async (query: string, connection: Connection): Promise<any> => {
  return new Promise((resolve, reject) => {
    // third argument is optional, but can be as fields
    connection.query(query, (error: any, results: any[]) => {
      if (error)
        reject(error)

      resolve(results)
    })
  })
}
