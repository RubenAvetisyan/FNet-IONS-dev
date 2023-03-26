import { Knex, knex } from 'knex'
import { config } from '../../config/index'

const dbConfig = config.get('dbConfig')

export const db: Knex = knex(config.get(dbConfig[DbName.A_BILLING]))
