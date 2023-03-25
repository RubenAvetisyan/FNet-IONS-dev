import { Knex, knex } from 'knex'
import { config } from '../../config/index'

enum DbName {
  LAN_BILLING = 'lanbilling',
  A_BILLING = 'abilling',
  ERP = 'erp',
}

const dbConfig = config.get('dbConfig')

export const db: Knex = knex(config.get(dbConfig[DbName.A_BILLING]))
