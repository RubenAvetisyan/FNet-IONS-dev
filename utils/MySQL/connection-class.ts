import { createPool, FieldInfo, Pool, PoolConfig } from 'mysql'
import { config } from '@/config/index'
import { RuntimeConfig } from '@nuxt/schema';

const dbConfig = config.get<RuntimeConfig['dbConfig']>('dbConfig');

interface QueryOptions {
  timezone?: string
}

class MySQLConnection {
  private pool: Pool
  public config: PoolConfig

  constructor(private readonly dbName: string, public connectionLimit = 10) {
    this.config = dbConfig[dbName]
    this.pool = this.createPool()
    this.getConnectionThreadId().then(res => console.log('connected as id ' + res))
  }

  private createPool(): Pool {
    return createPool(this.config)
  }

  public async getConnectionThreadId() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        resolve(connection.threadId)
      })
    })
  }

  public beginTransaction() {
    throw new Error('Method not implemented.');
  }

  public commit() {
    throw new Error('Method not implemented.');
  }

  public rollback() {
    throw new Error('Method not implemented.');
  }

  public executeQuery<T>(query: string, options: QueryOptions = { timezone: '+04:00' }): Promise<{ header: string[] | [], body: T[], FieldPackets: FieldInfo[] | undefined }> {
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

  public close() {
    this.pool.end()
  }
}

export default MySQLConnection
