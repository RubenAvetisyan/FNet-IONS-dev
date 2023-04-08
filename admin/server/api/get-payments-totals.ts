import os from 'node:os'
import { p as myPromise, mergeArrayable } from '@antfu/utils';
import { executeQuery } from "~~/admin/utils/sync/getPaymentsFromLanBilling";
import { readSqlFile } from '~~/utils/readSQLFile'
import { DbName } from "~~/utils/MySQL/connection-class";
import { FieldInfo } from 'mysql';
import { H3Error } from 'h3';
import { fetch } from 'ofetch';

const username = 'Ruben';
const password = 'rubena1985';

// Кодирование в формат base64
const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

type DataKeys = 'region' | 'city' | 'quarter' | 'street';

enum SqlFilePathsP {
  ACTIVE = '../../admin/assets/SQL/ABilling/TOTAL_ACTIVE_CLIENTS.sql',
  ACTIVE_CONTRACT_NUMBERS = '../../admin/assets/SQL/ABilling/ACTIVE_CONTRACT_NUMBERS.sql',
  PASSIVE_CONTRACT_NUMBERS_ONLY = '../../admin/assets/SQL/ABilling/PASSIVE_CONTRACT_NUMBERS_ONLY.sql',
  ALL_PAYMENT_GROUP_BY_TITLE = '../../admin/assets/SQL/ABilling/ALL_PAYMENT_GROUP_BY_TITLE.sql',
  ERP_CUSTOMERS_WITH_SEARCH_VARIABLES_P = '../../admin/assets/SQL/ERP/ERP_CUSTOMERS_WITH_SEARCH_VARIABLES.sql'
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


const setFilters = (data: Record<DataKeys, string>) => Object.entries(data).map(([k, v], i) => {
  const isColumn = filters.includes(k)
  const table = k === 'country' ? 'country' : 'address'
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

const nullCount = []
const mergeData = (queryA: QueryA, payments: Payments): MergedData[] => {
  return queryA.map(item => {
    const payment = payments.find(payment => `${payment.contractNumber}`.includes(`${item.contractNumber}`))
    return {
      ...item,
      count: payment?.count || 0,
      summa: +(payment?.summa || 0),
    };
  });
};

const mergeData1 = (queryA: QueryA, payments: Payments): Partial<MergedData>[] => {
  return payments.map(item => {
    const queries = queryA.find(query => `${query.contractNumber}`.includes(`${item.contractNumber}`))
    // if (!queries) nullCount.push(item.contractNumber)
    return {
      ...queries,
      count: item?.count || 0,
      summa: +(item?.summa || 0),
    };
  });
};

const filterData = (
  mergedData: MergedData[],
  queryActives: QueryActives,
  queryPassives: QueryPassives,
): { activeCustomers: MergedData[]; passiveCustomers: MergedData[] } => {
  const activeCustomers = mergedData.filter(item =>
    queryActives.some(active => +active.contractNumber === +item.contractNumber),
  );
  const passiveCustomers = mergedData.filter(item =>
    queryPassives.some(passive => +passive.contractNumber === +item.contractNumber),
  );

  return { activeCustomers, passiveCustomers };
};

const filterEndData = (data: MergedData[], property: keyof MergedData, value: any): MergedData[] => {
  return data.filter(item => item[property]?.toString().toLowerCase() === value?.toString().toLowerCase());
}

const getTotalSum = (data: MergedData[]): number => {
  return data.reduce((total, item) => +item.summa + total, 0);
}

const calculateTotalSums = (activeCustomers: MergedData[], passiveCustomers: MergedData[]): { activeTotal: number; passiveTotal: number } => {
  const activeTotal = getTotalSum(activeCustomers);
  const passiveTotal = getTotalSum(passiveCustomers);

  return { activeTotal, passiveTotal };
}

export default defineCachedEventHandler(async (event) => {
  try {
    const queryData = getQuery(event) as Record<string, string>
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
    console.log('mergedData: ', mergedData.filter(obj => obj.summa > 0).length);
    const { activeCustomers, passiveCustomers } = filterData(mergedData, queryActives, queryPassives);
    console.log('activeCustomers: ', activeCustomers.length);
    console.log('passiveCustomers: ', passiveCustomers.length);

    const groupedByArea = (data: MergedData[], text: string) => {
      console.log('text: ', text);
      return data.reduce((accumulator: { [key: string]: number }, item) => {
        if (!accumulator[text]) {
          accumulator[text] = 0;
        }

        if (item[queryData.tabKey as keyof MergedData] !== text) return accumulator

        accumulator[text] += +(item.summa.toFixed(2));
        return accumulator;
      }, {})
    }
    // console.log('activeCustomers: ', activeCustomers[0]);

    const keys = queryData.tabKey === 'country' ? ['Հայաստան'] :
      [...new Set(mergedData.map(data => data[queryData.tabKey as keyof MergedData]))] as string[]

    const activeTotal = keys.map((key) => groupedByArea(activeCustomers, key))
    console.log('passiveCustomers length: ', passiveCustomers.length);
    const passiveTotal = keys.map((key) => groupedByArea(passiveCustomers, key))

    console.log('Общая сумма для активных клиентов по городу:', activeTotal);
    console.log('Общая сумма для пассивных клиентов по городу:', passiveTotal);

    const next = Object.entries(texts).find((_, i) => {
      return i > 0 && i <= Object.entries(texts).length ? Object.keys(texts)[i - 1] === queryData.tabKey : false
    })

    const nextTabKey = next ? next[0] : '' as string

    const result = activeTotal.map((activeCustomer, index: number) => {
      const [activeKey, activeValue] = Object.entries(activeCustomer || {})[0]
      const passiveCustomer = passiveTotal.find(p => Object.keys(p).includes(activeKey)) || { [activeKey]: 0 }
      console.log('passiveCustomer: ', passiveCustomer);

      const [passiveKey, passiveValue] = Object.entries(passiveCustomer)[0]
      console.log('passiveValue: ', passiveValue);

      return {
        [queryData.tabKey === 'region' ? 'ՄԱՐԶԵՐ' : queryData.text]: {
          text: activeKey,
          tabKey: queryData.tabKey,
          nextTabKey
        },
        active: activeValue,
        passive: passiveValue,
        total: activeValue + passiveValue,
      };
    })
    console.log('result: ', result);

    console.log('total: ', (payments as Payments).reduceRight((a, c) => {
      a['summa'] += c.summa
      return a
    }, { summa: 0 }));

    const response = queryData.tabKey === 'country' ?
      {
        header: [
          {
            text: 'Ընդամենը',
            tabKey: 'country',
            nextTabKey: 'region',
            fn: () => { }
          },
          'ակտիվ', 'պասիվ', 'ընդամենը'
        ],
        body: result
      } :
      {
        header: [queryData.tabKey === 'region' ? 'ՄԱՐԶԵՐ' : queryData.text, 'ակտիվ', 'պասիվ', 'ընդամենը'],
        body: result
      }

    return { [queryData.tabKey]: response }
  } catch (error) {
    console.error('error: ', error);
  }
})

