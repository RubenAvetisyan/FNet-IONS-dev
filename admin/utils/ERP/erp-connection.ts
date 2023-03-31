import { DbName } from './../../../utils/MySQL/connection-class';
import MySQLConnection from '../../../utils/MySQL/connection-class'
import { readSqlFile } from '~~/utils/readSQLFile'
import { FieldInfo } from 'mysql';
import { H3Error } from 'h3';
import { p as myPromise, } from '@antfu/utils';
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling';

export const connection = new MySQLConnection(DbName.ERP)

export const customers = new Map<string, {} | ERPContractNumbers[]>()

/*
AND addressSubjectArea.title like '%Երևան%'
AND addressCity.title like '%Աբովյան%'
AND addressQuarter.title like '%Արարատ%'
AND addressStreet.title like '%Ե%Քոչար%'
*/

enum SqlFilePaths {
  ACTIVE = '../../admin/assets/SQL/ABilling/TOTAL_ACTIVE_CLIENTS.sql',
  ACTIVE_CONTRACT_NUMBERS = '../../admin/assets/SQL/ABilling/ACTIVE_CONTRACT_NUMBERS.sql',
  PASSIVE = '../../admin/assets/SQL/ABilling/TOTAL_PASSIVE_CLIENTS.sql',
  PASSIVE_CONTRACT_NUMBERS_ONLY = '../../admin/assets/SQL/ABilling/PASSIVE_CONTRACT_NUMBERS_ONLY.sql',
  ALL = '../../admin/assets/SQL/ABilling/TOTAL_EXISTING_CLIENTS.sql',
  ALL_CONTRACT_NUMBERS = '../../admin/assets/SQL/ABilling/ALL_CONTRACT_NUMBERS.sql',
  PAYMENTS = '../../admin/assets/SQL/ABilling/payment_cid_summa_by_date.sql',
}

export let queryString: string[]

export async function initialERPCustomersData() {
  try {
    await connection.getConnectionThreadId()
    let queryString = await readSqlFile('../../admin/assets/SQL/ERP/ERP_CUSTOMERS_WITH_SEARCH_VARIABLES.sql')
    queryString = queryString.replace(`filters`, '')

    const erpCustomers: {
      header: string[] | [];
      body: ERPContractNumbers[];
      FieldPackets: FieldInfo[] | undefined;
    } = await connection.executeQuery(queryString)

    const sqlFiles = await myPromise([
      SqlFilePaths.ACTIVE_CONTRACT_NUMBERS,
      SqlFilePaths.PASSIVE_CONTRACT_NUMBERS_ONLY,
      SqlFilePaths.ALL_CONTRACT_NUMBERS,
    ].map(async (filepath) => await readSqlFile(filepath)), { concurrency: 4 })

    const fileSource: (H3Error | {
      header: string[];
      body: { contractNumber: string }[];
      FieldPackets: FieldInfo[] | undefined;
    })[] = await myPromise(sqlFiles.map(async (file) => await executeQuery<{ contractNumber: string | number }>(file, DbName.A_BILLING)), { concurrency: 2 })

    customers.set('CONTRACT_NUMBERS', fileSource.map(item => {
      if (item instanceof H3Error) return
      return item.body.map(({ contractNumber }) => contractNumber).join(',')
    }).filter(s => s))

    customers.set('count', erpCustomers.body.length)
    customers.set('header', erpCustomers.header)
    customers.set('body', erpCustomers.body)
    customers.set('all', {
      header: erpCustomers.header,
      body: erpCustomers.header
    })
    customers.set('marzer', [...new Set(erpCustomers.body.map((body) => body.region))].filter(s => s))

    const CONTRACT_NUMBERS = customers.get('CONTRACT_NUMBERS') as string[]
    const MARZER = customers.get('marzer') as string[]

    const totals: Record<string, ERPContractNumbers[]> = {}
    await myPromise(CONTRACT_NUMBERS.map((conractNumbers, i) => {
      const key = ['active', 'passive', 'total'][i]
      totals[key] = erpCustomers.body.filter(body => {
        return conractNumbers.includes(body.contractNumber + '')
      })
      customers.set('totals', totals)
      return totals
    }), { concurrency: 12 })

    MARZER.forEach(region => {
      const marzData = erpCustomers.body.filter((body: any) => body.region === region)
      const [activeContractNumbers, passiveContractNumbers, totalContractNumbers] = CONTRACT_NUMBERS
      customers.set(region, {
        active: marzData.filter(data => activeContractNumbers.includes(data.contractNumber + '')),
        passive: marzData.filter(data => passiveContractNumbers.includes(data.contractNumber + '')),
        total: marzData.filter(data => totalContractNumbers.includes(data.contractNumber + '')),
      })
    })

    customers.set('country', {
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
        active: totals.active.length,
        passive: totals.passive.length,
        total: totals.total.length
      }]
    })

    const set = new Set()

    customers.set('regions', {
      header: [
        'ՄԱՐԶԵՐ', 'ակտիվ', 'պասիվ', 'ընդամենը'
      ],
      body: MARZER.map((key) => {
        const region = customers.get(key) as any
        return {
          'ՄԱՐԶԵՐ': {
            text: key,
            tabKey: 'region',
            nextTabKey: 'city',
            fn: () => { }
          },
          active: region.active.length || 0,
          passive: region.passive.length || 0,
          total: region.total.length || 0
        }
      }),
      data: MARZER
    })

    return customers
  } catch (error) {
    console.log('error: ', error);
    throw error
  }
}

(async function () {
  await initialERPCustomersData()
  console.log('DONE')
})()
