import MySQLConnection, { DbName } from '@/utils/MySQL/connection-class';

export const connection = new MySQLConnection(DbName.A_BILLING)
