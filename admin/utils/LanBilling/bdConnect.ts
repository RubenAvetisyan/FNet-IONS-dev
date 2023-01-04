import type { H3Error } from 'h3'
import { createError } from 'h3'
import type { Connection, MysqlError } from 'mysql'
import { createConnection } from 'mysql'
import { config } from '~~/Config/index'

const dbConfig = config.get('dbConfig') as {
  [key: 'lanbilling' | 'abilling' | 'erp' | string]: {
    host: string
    port: number
    user: string
    password: string
    database: string
    insecureAuth?: boolean
  }
}

function connection(conn: Connection) {

  const currentConnection = async () => new Promise((resolve, reject) => {
    conn.connect((err, args: any[]) => {
      if (err)
        reject(err)
      resolve(args)
    })
  }) as Promise<any[]>

  conn.on('error', async function (err) {
    console.log('db error', err);
    console.log('reconnect to: ', conn.config.database);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      return await currentConnection();                         // lost due to either server restart, or a
    } else {
      await currentConnection()                                    // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  })

  return { conn, currentConnection }
}

export const lanbillingConnection: Promise<Connection | H3Error> = (async () => {
  try {
    const conn = createConnection(dbConfig.lanbilling)
    const { currentConnection } = connection(conn)
    await currentConnection()

    return conn
  }
  catch (error: MysqlError | unknown) {
    console.error('lanbilling connection error: ', error)
    return createError(error as MysqlError)
  }
})()

export const abillingConnection: Promise<Connection | H3Error> = (async () => {
  try {
    const conn = createConnection(dbConfig.abilling)
    const { currentConnection } = connection(conn)
    await currentConnection()

    return conn
  }
  catch (error: MysqlError | unknown) {
    console.error('abilling connection error: ', error)
    return createError(error as MysqlError)
  }
})()

export const erpConnection: Promise<Connection | H3Error> = (async () => {
  try {
    const conn = createConnection(dbConfig.erp)
    const { currentConnection } = connection(conn)
    await currentConnection()

    return conn
  }
  catch (error: MysqlError | unknown) {
    console.error('erp connection error: ', error)
    return createError(error as MysqlError)
  }
})()
