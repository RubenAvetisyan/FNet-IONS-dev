import Knex from 'knex';
import * as dbConfig from '@/config';
import MySQLConnection from '@/utils/MySQL/connection-class';
import { RuntimeConfig } from '@nuxt/schema';

const config = dbConfig.config.get<RuntimeConfig['dbConfig']>('dbConfig')

const knexConfig = {
  client: 'mysql',
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    charset: 'utf8mb4',
  },
  pool: {
    min: 2,
    max: 10,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false, // <- default is true, set to false
  },
  debug: config.debug,
};

const connection = new MySQLConnection(config.database);

const knex = Knex(knexConfig);

knex
  .on('query', async (data) => {
    const sql = data.sql.replace(/ +(?= )/g, '').trim();

    if (sql === 'START TRANSACTION') {
      await connection.beginTransaction();
    } else if (sql === 'COMMIT') {
      await connection.commit();
    } else if (sql === 'ROLLBACK') {
      await connection.rollback();
    }
  })
  .on('query-error', async (err) => {
    console.error('knex -> query-error', err);
    await connection.rollback();
  })
  .on('error', async (err) => {
    console.error('knex -> error', err);
    await connection.rollback();
  });

export default knex;

