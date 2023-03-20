import { createPool, FieldInfo, Pool, PoolConfig } from 'mysql'
import { config } from '@/config/index'

enum DbName {
  LAN_BILLING = 'lanbilling',
  A_BILLING = 'abilling',
  ERP = 'erp',
}

type DbConfig = Record<DbName, PoolConfig>;

const dbConfig: DbConfig = config.get('dbConfig');

export interface QueryOptions {
  timezone?: string
}

class MySQLConnection {
  private pool: Pool
  public config: PoolConfig

  constructor(dbName: DbName, public connectionLimit?: number) {
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

  executeQuery<T>(query: string, options: QueryOptions = { timezone: '+04:00' }): Promise<{ header: string[] | [], body: T[], FieldPackets: FieldInfo[] | undefined }> {
    const queryOptions: QueryOptions = { ...options }

    return new Promise((resolve, reject) => {
      this.pool.query(query, queryOptions, (error, results = [], fields) => {
        if (error)
          reject(error)
        else
          resolve({ header: !fields ? [] : fields.map(({ name }) => name), body: results as T[] || [], FieldPackets: fields })
      })
    })
  }

  close() {
    this.pool.end()
  }
}

export default MySQLConnection
