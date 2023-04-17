import os from 'node:os'
import { p as myPromise, mergeArrayable } from '@antfu/utils';
import { executeQuery } from "~~/admin/utils/sync/getPaymentsFromLanBilling";
import { readSqlFile } from '~~/utils/readSQLFile'
import { DbName } from "~~/utils/MySQL/connection-class";
import { H3Error } from 'h3';

type DataKeys = 'region' | 'city' | 'quarter' | 'street';

enum SqlFilePathsP {
  ACTIVE = '../../admin/assets/SQL/ABilling/TOTAL_ACTIVE_CLIENTS.sql',
  ACTIVE_CONTRACT_NUMBERS = '../../admin/assets/SQL/ABilling/ACTIVE_CONTRACT_NUMBERS.sql',
  PASSIVE_CONTRACT_NUMBERS_ONLY = '../../admin/assets/SQL/ABilling/PASSIVE_CONTRACT_NUMBERS_ONLY.sql',
  ALL_PAYMENT_GROUP_BY_TITLE = '../../admin/assets/SQL/ABilling/ALL_PAYMENT_GROUP_BY_TITLE.sql',
  ERP_CUSTOMERS_WITH_SEARCH_VARIABLES_P = '../../admin/assets/SQL/ERP/ERP_CUSTOMERS_WITH_SEARCH_VARIABLES.sql'
}

const cpuLength = os.cpus().length

const filters = ['region', 'city', 'quarter', 'street']


const setFilters = (data: Record<DataKeys, string>) => Object.entries(data).map(([k, v], i) => {
  const isColumn = filters.includes(k)
  // const table = k === 'country' ? 'country' : 'address'
  return isColumn ? `AND MAIN.${k} like '%${v}%'` : '';
}).join('')

const setGroupBy = (data?: string) => {
  return data ? 'GROUP BY MAIN.contractNumber, ' + data : ''
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

type QueryA = {
  contractNumber: number;
  customerName: string;
  country: string;
  region: string;
  city: string;
  quarter: string;
  street: string;
  count: number;
}[]

type QueryActives = { contractNumber: number; }[]
type QueryPassives = { contractNumber: number; }[]

type Payments = {
  contractNumber: number;
  summa: number;
  count: number;
}[]

type MergedData = {
  contractNumber: number;
  customerName: string;
  country: string;
  region: string;
  city: string;
  quarter: string;
  street: string;
  count: number;
  summa: number;
}

const mergeData1 = (queryA: QueryA, payments: Payments): MergedData[] => {
  const mapQueryA: { [key: number]: QueryA[number] } = {};
  queryA.forEach(q => mapQueryA[q.contractNumber] = q);

  const afterMerge: MergedData[] = payments.map(item => {
    const query = mapQueryA[item.contractNumber];
    if (!query) return null;
    return {
      ...query,
      count: item?.count || 0,
      summa: +(item?.summa || 0),
    };
  }).filter(Boolean) as MergedData[];

  return afterMerge;
};

const filterData = (
  mergedData: MergedData[],
  queryActives: QueryActives,
  queryPassives: QueryPassives,
): { activeCustomers: MergedData[]; passiveCustomers: MergedData[] } => {
  const activeCustomers: MergedData[] = [];
  const passiveCustomers: MergedData[] = [];

  for (const item of mergedData) {
    const contractNumber = item.contractNumber;

    if (queryActives.some(active => +active.contractNumber === +contractNumber)) {
      activeCustomers.push(item);
    }

    if (queryPassives.some(passive => +passive.contractNumber === +contractNumber)) {
      passiveCustomers.push(item);
    }
  }

  return { activeCustomers, passiveCustomers };
};

export default defineCachedEventHandler(async (event) => {
  try {
    const queryData = getQuery(event) as Record<string, string>;
    console.log('queryData: ', queryData);

    const sqlFilters = setFilters(queryData)
    const sqlGroupBy = setGroupBy(queryData.tabKey)

    const queryStrings = await readSqlFile(
      SqlFilePathsP.ERP_CUSTOMERS_WITH_SEARCH_VARIABLES_P,
      SqlFilePathsP.ACTIVE_CONTRACT_NUMBERS,
      SqlFilePathsP.PASSIVE_CONTRACT_NUMBERS_ONLY,
      SqlFilePathsP.ALL_PAYMENT_GROUP_BY_TITLE
    ) as string[]

    queryStrings[0] = queryStrings[0]
      .replace('FILTERS', sqlFilters)
      .replace('GROUPS', queryData.tabKey === 'country' ? '' : sqlGroupBy)

    queryStrings[3] = queryStrings[3].replace('2023-03-01', queryData.dateFrom).replace('2023-03-31', queryData.dateTo)
    const [queryA, queryActives, queryPassives, payments] = await usePromise<(QueryA | QueryActives | QueryPassives | Payments)[]>(queryStrings.map(async (qs, i) => {
      const resp = await executeQuery<QueryA | QueryActives | QueryPassives | Payments>(qs, i === 0 ? DbName.ERP : DbName.A_BILLING)
      if (resp instanceof H3Error) throw resp
      return resp.body
    }))

    const mergedData = mergeData1(queryA as QueryA, payments as Payments);
    console.log('payments: ', payments.length);
    console.log('mergedData: ', mergedData.reduce((count, obj) => count + (obj.summa > 0 ? 1 : 0), 0));
    const { activeCustomers, passiveCustomers } = filterData(mergedData, queryActives, queryPassives);
    console.log('activeCustomers: ', activeCustomers.length);
    console.log('passiveCustomers: ', passiveCustomers.length);

    const groupedByArea = (data: MergedData[], text: string) => {
      const filteredData = data.filter(item => item[queryData.tabKey as keyof MergedData] === text);
      const sum = filteredData.reduce((accumulator, item) => {
        return accumulator + Number(item.summa.toFixed(2));
      }, 0);
      return { [text]: sum };
    };

    const keys = queryData.tabKey === 'country' ? ['Հայաստան'] :
      [...new Set(mergedData.map(data => data[queryData.tabKey as keyof MergedData]))] as string[];

    const [activeTotal, passiveTotal] = [activeCustomers, passiveCustomers].map(customers => {
      const result = keys.map(key => groupedByArea(customers, key));
      return result;
    });
    console.log('keys: ', keys);

    console.log('activeTotal: ', activeTotal.length);
    console.log('passiveCustomers length: ', passiveCustomers.length);

    console.log('Общая сумма для активных клиентов по городу:', activeTotal);
    console.log('Общая сумма для пассивных клиентов по городу:', passiveTotal);

    if (queryData.tabKey === 'country') {
      return {
        country: {
          header: [
            {
              text: 'Հայաստան',
              tabKey: 'country',
              nextTabKey: 'region',
              fn: () => { }
            },
            'ակտիվ', 'պասիվ', 'ընդամենը'
          ],
          body: [{
            'Հայաստան': 'քանակ',
            active: activeTotal[0]['Հայաստան'],
            passive: passiveTotal[0]['Հայաստան'],
            total: activeTotal[0]['Հայաստան'] + passiveTotal[0]['Հայաստան'],
          }]
        }
      }
    }

    const result: any[] = [];
    const next = Object.entries(texts).find((_, i) => i > 0 && i <= Object.entries(texts).length && Object.keys(texts)[i - 1] === queryData.tabKey);
    const nextTabKey = next ? next[0] : '';

    const passiveMap: { [key: string]: any } = passiveTotal.reduce((acc, obj) => {
      const key = Object.keys(obj)[0];
      acc[key] = obj[key];
      return acc;
    }, {});

    for (const activeCustomer of activeTotal) {
      const [activeKey, activeValue] = Object.entries(activeCustomer || {})[0];
      const passiveValue = passiveMap[activeKey] || 0;

      result.push({
        [queryData.tabKey === 'region' ? 'ՄԱՐԶԵՐ' : queryData.text]: {
          text: activeKey,
          tabKey: queryData.tabKey,
          nextTabKey
        },
        active: activeValue,
        passive: passiveValue,
        total: activeValue + passiveValue,
      });
    }

    const response = {
      header: [queryData.tabKey === 'region' ? 'ՄԱՐԶԵՐ' : queryData.text, 'ակտիվ', 'պասիվ', 'ընդամենը'],
      body: result
    }

    return { [queryData.tabKey]: response }
  } catch (error) {
    console.error('error: ', error);
  }
})

