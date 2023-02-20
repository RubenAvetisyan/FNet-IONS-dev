import {createPool, Pool, PoolConfig} from 'mysql'
import { config } from '~~/Config/index'

const dbConfig = config.get('dbConfig') as {
  [key: 'lanbilling' | 'abilling' | 'erp' | string]: PoolConfig
}

export interface QueryOptions {
  timezone?: string
}

class MySQLConnection {
  private pool: Pool
  public config: PoolConfig

  constructor(dbName: string, public connectionLimit?: number) {
    this.config = dbConfig[dbName]
    this.connectionLimit = connectionLimit || 10
    this.pool = this.createPool()
    this.getConnectionThreadId().then(res => console.log('connected as id ' + res))
  }

  createPool(): Pool {
    return createPool(this.config)
  }

  async getConnectionThreadId(){    
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if(err) reject(err)
        resolve(connection.threadId)
     })
    })
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
