import { createPool, FieldInfo, Pool, PoolConfig, ConnectionConfig } from 'mysql'
import { config } from '@/config/index'
import { RuntimeConfig } from '@nuxt/schema';

const dbConfig = config.get<RuntimeConfig['dbConfigs']>('dbConfig');

export interface QueryOptions {
  timezone?: string
}

export enum DbName {
  LAN_BILLING = 'lanbilling',
  A_BILLING = 'abilling',
  ERP = 'erp',
}

class MySQLConnection {
  private pool: Pool
  public config: PoolConfig

  constructor(private readonly dbName: DbName, public connectionLimit = 10) {
    this.config = {
      ...dbConfig[dbName],
      port: 3306,
      multipleStatements: true
    }
    console.log('this.config: ', this.config);
    this.pool = this.createPool()
    // получение текущего количества подключений
    const currentConnections = this.pool.config.connectionLimit;
    console.log('currentConnections: ', currentConnections);

    this.getConnectionThreadId().then(res => console.log('connected as id ' + res))
  }

  private createPool(): Pool {
    return createPool(this.config)
  }

  public async getConnectionThreadId() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          this.pool.end((err) => {
            console.error('this.pool.end err: ', err);
            // handle error or do something else
          })
          reject({ err, message: this.dbName + ': getConnection: ' + err.sqlMessage! || '' })
        }
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

        this.pool.end()
      })
    })
  }

  public close() {
    this.pool.end()
  }
}

export default MySQLConnection
