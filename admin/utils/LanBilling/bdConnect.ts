import type { Connection } from 'mysql'
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

export const lanbillingConnection: Connection = (() => {
  const conn = createConnection(dbConfig.lanbilling)
  conn.connect()
  return conn
})()

export const abillingConnection: Connection = (() => {
  const conn = createConnection(dbConfig.abilling)
  conn.connect()
  return conn
})()

export const erpConnection: Connection = (() => {
  const conn = createConnection(dbConfig.erp)
  conn.connect()
  return conn
})()
