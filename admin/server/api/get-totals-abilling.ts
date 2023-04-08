import { getQuery, H3Error } from 'h3';
// import { customers } from '@/admin/utils/ERP/erp-connection';
import filter from 'lodash/filter';
import { p as myPromise, } from '@antfu/utils';
import { readSqlFile } from '~~/utils/readSQLFile'
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling';
import { DbName } from '~~/utils/MySQL/connection-class';
import { isSameDay, parseISO } from 'date-fns'

let customers: any = {}

type DataKeys = 'region' | 'city' | 'quarter' | 'street';

const filtersMap: Record<DataKeys, string> = {
  region: 'addressSubjectArea',
  city: 'addressCity',
  quarter: 'addressQuarter',
  street: 'addressStreet',
};

const defaultVal = {
  header: [],
  body: []
}

const texts = {
  regions: 'ՄԱՐԶ',
  city: 'ՔԱՂԱՔ/Գյուղ',
  quarter: 'ՀԱՄԱՅՆՔ',
  street: 'ՓՈՂՈՑ',
}


export default defineEventHandler(async (event) => {
  try {
    if (!customers) throw createError('customers not defined. Check "@/admin/utils/ERP/erp-connection"')

    let response = {
      country: customers.get('country'),
      regions: customers.get('regions'),
      city: defaultVal,
      quarter: defaultVal,
      street: defaultVal,
    }

    const data = getQuery(event) as { [key: string]: string }

    console.log('data: ', data);

    if (Object.keys(data).length > 1) {

      const filter = Object.entries(data)
        .map(([k, v]) => {
          const column = filtersMap[k as DataKeys];
          return column ? `AND ${column}.title like '%${v}%'` : '';
        })
        .join(' ')
      console.log('filter: ', filter);

      let queryString = await readSqlFile('../../admin/assets/SQL/ERP/ERP_CUSTOMERS_WITH_SEARCH_VARIABLES.sql')
      queryString = queryString.replace('filters', filter)

      const res = await executeQuery(queryString, DbName.ERP)
      if (res instanceof H3Error) throw res
      const fields: string[] = [...new Set(res.body.map((b: any) => b[data.tabKey]))]

      // const totals = customers.get('totals')
      const [activeContractNumbers, passiveContractNumbers, totalContractNumbers] = customers.get('CONTRACT_NUMBERS') as string[]
      const body = [] as any[]
      const next = Object.entries(texts).find((_, i) => {
        return i > 0 && i <= Object.entries(texts).length ? Object.keys(texts)[i - 1] === data.tabKey : false
      })

      const nextTabKey = next ? next[0] : '' as string
      fields.forEach(field => {
        const fieldsData = res.body.filter((body: any) => body[data.tabKey] === field)
        body.push({
          [data.text]: {
            text: field,
            tabKey: data.tabKey,
            nextTabKey
          },
          active: fieldsData.filter((data: any) => activeContractNumbers.includes(data.contractNumber + '')).length,
          passive: fieldsData.filter((data: any) => passiveContractNumbers.includes(data.contractNumber + '')).length,
          total: fieldsData.filter((data: any) => totalContractNumbers.includes(data.contractNumber + '')).length
        })
      })

      return {
        header: [data.text, 'ակտիվ', 'պասիվ', 'ընդամենը'],
        body
      }
    }


    console.log('data.tabKey: ', data.tabKey);
    return response || defaultVal

  } catch (error) {
    console.log('error: ', error);
    if (error instanceof Error)
      throw new Error('something goes wrong')
  }
})

type DataItem = {
  active: ERPContractNumbers[];
  passive: ERPContractNumbers[];
  total: ERPContractNumbers[];
}

async function getTotals(text: string, data: string, filterKey?: string, filterValue?: string | number) {
  const totals: DataItem = customers.get('totals') as any;
  const result = {
    header: [{
      text,
      tabKey: data,
      fn: (e: any, header: any) => { }
    }, 'ակտիվ', 'պասիվ', 'ընդամենը'],
    body: [] as any[]
  };

  const body = { [text]: filterKey || 'քաղաք' } as any;
  await myPromise(Object.entries(totals).map(([key, value]) => {
    let count = 0;

    if (filterKey) {
      count = filter(value, (item: ERPContractNumbers) => item[key as keyof ERPContractNumbers] === filterValue).length;
    } else {
      count = value.length;
    }

    body[key] = count;
  }), { concurrency: 3 });
  result.body.push(body);
  console.log('END END END')
  return result;
}

