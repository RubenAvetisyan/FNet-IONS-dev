import mysql from 'mysql'
import { config } from '~~/Config/index'

const dbConfig = config.get('dbConfig') as {
  [key: 'lanbilling' | 'abilling' | 'erp' | string]: mysql.PoolConfig
}

export interface QueryOptions {
  timezone?: string
}

class MySQLConnection {
  private pool: mysql.Pool
  public config: mysql.PoolConfig

  constructor(dbName: string, public connectionLimit?: number) {
    this.config = dbConfig[dbName]
    this.connectionLimit = connectionLimit || 10
    this.pool = mysql.createPool(this.config)
  }

  createPool(): void {
    this.pool = mysql.createPool(this.config)
  }

  executeQuery<T>(query: string, options?: QueryOptions): Promise<T> {
    const queryOptions: QueryOptions = { ...options }
    queryOptions.timezone = '+04:00'

    return new Promise((resolve, reject) => {
      this.pool.query(query, queryOptions, (error, results, fields) => {
        if (error)
          reject(error)
        else
          resolve(results as T)
      })
    })
  }

  close() {
    this.pool.end()
  }
}

export default MySQLConnection
