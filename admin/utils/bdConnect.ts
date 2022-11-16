import type { Connection } from 'mysql'
import { createConnection } from 'mysql'
import { config } from '~~/Config/index'

const dbConfig = config.get('dbConfig') as {
  host: string
  port: number
  user: string
  password: string
  database: string
}

export const connection: Connection = (() => {
  const conn = createConnection(dbConfig)
  conn.connect()
  return conn
})()
