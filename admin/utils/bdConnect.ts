import type { Connection } from 'mysql'
import { createConnection } from 'mysql'

const { syncConfig } = useRuntimeConfig()

const config = { ...syncConfig, port: +syncConfig.port || 3306 }

export const connection: Connection = (() => {
  const conn = createConnection(config)
  conn.connect()
  return conn
})()
