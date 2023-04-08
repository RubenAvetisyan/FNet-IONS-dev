import { FieldInfo } from 'mysql';
import { H3Error } from 'h3';
import { p } from '@antfu/utils';
import { readSqlFile } from '@@/utils/readSQLFile'
import { executeQuery } from '@@/admin/utils/sync/getPaymentsFromLanBilling';


export const fNetMap = new Map<string, { [key: string]: any }>()
export const queryString = readSqlFile('../../admin/assets/SQL/ERP/ERP_CUSTOMERS_WITH_SEARCH_VARIABLES.sql')
