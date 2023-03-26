import Knex from 'knex';
import { config } from '@/config/index'
import MySQLConnection, { DbName } from '@/utils/MySQL/connection-class';
import { RuntimeConfig } from '@nuxt/schema';

const dbConfig = config.get<RuntimeConfig['dbConfigs']>('dbConfig');

const knexConfig = {
  client: 'mysql',
  connection: {
    host: dbConfig.abilling.host,
    port: dbConfig.abilling.port,
    user: dbConfig.abilling.user,
    password: dbConfig.abilling.password,
    database: dbConfig.abilling.database,
    charset: 'utf8mb4',
  },
  pool: {
    min: 2,
    max: 100,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false, // <- default is true, set to false
  }
};

const connection = new MySQLConnection(DbName.A_BILLING);

const knex = Knex(knexConfig);

knex
  .on('query', async (data) => {
    const sql = data.sql.replace(/ +(?= )/g, '').trim();

    if (sql === 'START TRANSACTION') {
      connection.beginTransaction();
    } else if (sql === 'COMMIT') {
      connection.commit();
    } else if (sql === 'ROLLBACK') {
      connection.rollback();
    }
  })
  .on('query-error', async (err) => {
    console.error('knex -> query-error', err);
    connection.rollback();
  })
  .on('error', async (err) => {
    console.error('knex -> error', err);
    connection.rollback();
  });

export default knex;

