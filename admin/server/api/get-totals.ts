import os from 'node:os'
import { p as myPromise, } from '@antfu/utils';
import { executeQuery } from "~~/admin/utils/sync/getPaymentsFromLanBilling";
import { readSqlFile } from '~~/utils/readSQLFile'
import { DbName } from "~~/utils/MySQL/connection-class";
import { FieldInfo } from 'mysql';
import { H3Error } from 'h3';

type DataKeys = 'region' | 'city' | 'quarter' | 'street';

enum SqlFilePaths {
  ACTIVE = '../../admin/assets/SQL/ABilling/TOTAL_ACTIVE_CLIENTS.sql',
  ACTIVE_CONTRACT_NUMBERS = '../../admin/assets/SQL/ABilling/ACTIVE_CONTRACT_NUMBERS.sql',
  PASSIVE = '../../admin/assets/SQL/ABilling/TOTAL_PASSIVE_CLIENTS.sql',
  PASSIVE_CONTRACT_NUMBERS_ONLY = '../../admin/assets/SQL/ABilling/PASSIVE_CONTRACT_NUMBERS_ONLY.sql',
  ALL = '../../admin/assets/SQL/ABilling/TOTAL_EXISTING_CLIENTS.sql',
  ALL_CONTRACT_NUMBERS = '../../admin/assets/SQL/ABilling/ALL_CONTRACT_NUMBERS.sql',
  PAYMENTS = '../../admin/assets/SQL/ABilling/payment_cid_summa_by_date.sql',
  ERP_CUSTOMERS_WITH_SEARCH_VARIABLES = '../../admin/assets/SQL/ERP/ERP_CUSTOMERS_WITH_SEARCH_VARIABLES_IMPROVED.sql'
}

type QueryResponse = H3Error | {
  header: string[];
  body: { contractNumber: string }[];
  FieldPackets: FieldInfo[] | undefined;
}

const cpuLength = os.cpus().length

const filters = ['region', 'city', 'quarter', 'street']
const filtersMap: Record<DataKeys, string> = {
  region: 'region',
  city: 'city',
  quarter: 'quarter',
  street: 'street',
};


const setFilters = (data: Record<DataKeys, string>) => Object.entries(data).map(([k, v]) => {
  const isColumn = filters.includes(k)
  const table = k === 'country' ? 'country' : 'address'
  return isColumn ? `AND ${table}.${k} like '%${v}%'` : '';
}).join('')

const setGroupBy = (data?: string) => {
  return data ? 'GROUP BY MAIN.' + data : ''
}

const usePromise = async <T>(iterable: any[]): Promise<T> => {
  const concurrency = iterable.length > cpuLength ? cpuLength : iterable.length
  const response = await myPromise<T>(iterable, { concurrency })
  return response
}

const texts = {
  region: 'ՄԱՐԶ',
  city: 'ՔԱՂԱՔ/Գյուղ',
  quarter: 'ՀԱՄԱՅՆՔ',
  street: 'ՓՈՂՈՑ',
}

export default defineCachedEventHandler(async (event) => {
  const queryData = getQuery(event) as Record<string, string>
  console.log('queryData: ', queryData);

  const sqlFilters = setFilters(queryData)


  const queryStrings = await readSqlFile(
    SqlFilePaths.ERP_CUSTOMERS_WITH_SEARCH_VARIABLES,
    SqlFilePaths.ACTIVE_CONTRACT_NUMBERS,
    SqlFilePaths.PASSIVE_CONTRACT_NUMBERS_ONLY,
    // SqlFilePaths.ALL_CONTRACT_NUMBERS
  ) as string[]

  let queryString = queryStrings[0]

  queryString = queryString.replace('2022-01-01', `${queryData.dateFrom}`)
  queryString = queryString.replace('current_date()', `'${queryData.dateTo}'`)
  queryString = queryString.replace('FILTERS', sqlFilters)
  const sqlGroupBy = setGroupBy(queryData.tabKey)

  queryString = queryString.replace('GROUPS', sqlGroupBy)

  const CONTRACT_NUMBERS = await usePromise<string[]>(queryStrings.slice(1).map(async (qs) => {
    const response = await executeQuery<{ contractNumber: number }>(qs, DbName.A_BILLING)
    if (response instanceof H3Error) throw response
    return response.body.map(({ contractNumber }) => contractNumber).join(',')
  }))

  type Body = {
    customerNumber: number;
    customerName: string;
    region: string;
    city: string;
    quarter: string;
    street: string;
    count: number;
  }

  type Key = keyof Body;

  const [actives, passives] = await usePromise<Body[][]>(CONTRACT_NUMBERS.map(async (contractNumber, i): Promise<Body[]> => {
    const k = ['active', 'passive'][i]

    let qs = queryString
    qs = qs.replace('contractNumbers', contractNumber)
    const response = await executeQuery<Body>(qs, DbName.ERP)

    if (response instanceof H3Error) throw response
    return response.body.map(obj => ({ ...obj }))
  }))

  const next = Object.entries(texts).find((_, i) => {
    return i > 0 && i <= Object.entries(texts).length ? Object.keys(texts)[i - 1] === queryData.tabKey : false
  })

  const nextTabKey = next ? next[0] : '' as string

  const result = actives.map((activeCustomer: Body, index: number) => {
    const passiveCustomer = passives[index]

    return {
      [queryData.tabKey === 'region' ? 'ՄԱՐԶԵՐ' : queryData.text]: {
        text: activeCustomer[queryData.tabKey as Key],
        tabKey: queryData.tabKey,
        nextTabKey
      },
      active: activeCustomer?.count || 0,
      passive: passiveCustomer?.count || 0,
      total: (activeCustomer?.count || 0) + (passiveCustomer?.count || 0),
    };
  });

  const response = queryData.tabKey === 'country' ?
    {
      header: [
        {
          text: 'Հայաստան',
          tabKey: 'country',
          nextTabKey: 'region',
          fn: () => { }
        },
        'ակտիվ', 'պասիվ', 'Հայաստան'
      ],
      body: [{
        'Հայաստան': 'քանակ',
        active: result[0]?.active,
        passive: result[0]?.passive,
        total: result[0]?.total
      }]
    } :
    {
      header: [queryData.tabKey === 'region' ? 'ՄԱՐԶԵՐ' : queryData.text, 'ակտիվ', 'պասիվ', 'Հայաստան'],
      body: result
    }

  return { [queryData.tabKey]: response }
})
