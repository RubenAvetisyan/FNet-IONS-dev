import { createPool, FieldInfo, Pool, PoolConfig } from 'mysql'
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
  private pool: Pool;
  public config: PoolConfig;
  private timeouts: Map<string, NodeJS.Timeout>;

  constructor(private readonly dbName: DbName, public connectionLimit = 10) {
    this.config = {
      ...dbConfig[dbName],
      port: 3306,
      multipleStatements: true
    };
    this.timeouts = new Map();
    this.pool = this.createPool();

    // получение текущего количества подключений
    const currentConnections = this.pool.config.connectionLimit;
    console.log('currentConnections: ', currentConnections);

    this.getConnectionThreadId().then(res => console.log('connected as id ' + res))
      .catch((error) => console.error(`Ошибка при подключении: ${error}`));
  }

  private createPool(): Pool {
    console.log('this.config: ', JSON.stringify(this.config));
    return createPool(this.config);
  }

  reconnect() {
    this.close()
    this.pool = this.createPool()
  }

  public async getConnectionThreadId(): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          this.pool.end((err) => {
            console.error('Ошибка при завершении пула соединений: ', err);
            // обработать ошибку или сделать что-то еще
          });
          reject({ err, message: this.dbName + ': getConnection: ' + err.sqlMessage! || '' });
        }
        resolve(connection.threadId);
      });
    });
  }

  public beginTransaction() {
    throw new Error('Метод не реализован.');
  }

  public commit() {
    throw new Error('Метод не реализован.');
  }

  public rollback() {
    throw new Error('Метод не реализован.');
  }

  timeout(key: string, fn: () => any, milliseconds: number = 500) {
    const timerId = setTimeout(() => {
      fn();
      this.timeouts.delete(key);
    }, milliseconds);
    this.timeouts.set(key, timerId);
  }

  public executeQuery<T>(query: string, options: QueryOptions = { timezone: '+04:00' }, timeout: number = 120000): Promise<{ header: string[] | [], body: T[], FieldPackets: FieldInfo[] | undefined }> {
    const queryOptions: QueryOptions = { ...options };
    return new Promise((resolve, reject) => {
      this.pool.query('SET SESSION group_concat_max_len = 50000;', (err) => {
        if (err) throw err
        this.pool.query(query, queryOptions, async (error, results = [], fields) => {
          try {
            const threadId = await this.getConnectionThreadId()
            if (error) {
              (threadId && await this.killThreadById(threadId))
              reject(error)
            }
            else {
              resolve({
                header: !fields ? [] : fields.map((field) => field?.name || 'mustBeReviewed'),
                body: results as T[] || [],
                FieldPackets: fields
              })
              console.log('threadId: ', threadId);
              if (threadId) {
                await this.killThreadById(threadId)
              }
            }
          } catch (error) {
            throw error
          };
        });
      })
    });
  }

  public async killThreadById(threadId: number) {
    if (!threadId) console.log('threadId not defined')
    return new Promise((resolve, reject) => {
      const killQuery = `KILL ${threadId}`;
      this.pool.query(killQuery, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  public close() {
    this.pool.end();
  }
}

export default MySQLConnection;
