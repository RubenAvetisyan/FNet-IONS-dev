import { createError, H3Error } from 'h3';
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
  }
}

function connection(conn: Connection) {
  const currentConnection = async () => new Promise((resolve, reject) => {
    conn.connect((err, args: any[]) => {
      if (err) reject(err)
      resolve(args)
    })
  }) as Promise<any[]>

  return { conn, currentConnection }
}

export const lanbillingConnection: Promise<Connection | H3Error> = (async () => {
  try {
    const conn = createConnection(dbConfig.lanbilling)
    const { currentConnection } = connection(conn)
    const thisConnection = await currentConnection()
    console.log('LanBilling Connection: ', thisConnection);
    return conn
  } catch (error: MysqlError | unknown) {
    console.log('lanbilling connection error: ', error)
    return createError(error as MysqlError)
  }
})()

export const abillingConnection: Promise<Connection | H3Error> = (async () => {
  try {
    const conn = createConnection(dbConfig.abilling)
    const { currentConnection } = connection(conn)
    const thisConnection = await currentConnection()
    console.log('ABilling Connection: ', thisConnection);
    return conn
  } catch (error: MysqlError | unknown) {
    console.log('abilling connection error: ', error)
    return createError(error as MysqlError)
  }
})()

export const erpConnection: Promise<Connection | H3Error> = (async () => {
  try {
    const conn = createConnection(dbConfig.erp)
    const { currentConnection } = connection(conn)
    const thisConnection = await currentConnection()
    console.log('ERP Connection: ', thisConnection);
    return conn
  } catch (error: MysqlError | unknown) {
    console.log('erp connection error: ', error)
    return createError(error as MysqlError)
  }
})()
