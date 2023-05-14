import { DbName } from '../../../utils/MySQL/connection-class';
import { defineEventHandler, H3Error, readBody } from 'h3'
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { readSqlFile } from '~~/utils/readSQLFile'


enum SqlFilePaths {
  OLT_PON_AIM_CONTRACT_ADDRESS = '../../admin/assets/SQL/ABilling/OLT_PON_AIM_CONTRACT_ADDRESS.sql',
  ERP_Customers = '../../admin/assets/SQL/ERP/ERP_Customers.sql'
}

type OltPonAim = {
  cid: number;
  pid: number;
  ip: string;
  PON: string;
  AIM: string;
  serial: string;
  'Պայմանագիր №': string;
  'Հասցե': string;
}

type ErpCustomers = {
  customerNumber: string;
  customerName: string;
  customerType: string;
  phone: string;
  country: string;
  region: string;
  city: string;
  quarter: string;
  street: string;
  house: string;
  dt: number;
  aggrimentDate: Date
}

type UnionType = {
  cid: number;
  pid: number;
  ip: string;
  PON: string;
  AIM: string;
  serial: string;
  'Պայմանագիր №': string;
  'Հասցե': string;
  phone: string;
}

export const cachedAimPon = cachedFunction(async () => {
  const [
    oltPonAimQueryString,
    erpCustomersQueryString
  ] = await readSqlFile(SqlFilePaths.OLT_PON_AIM_CONTRACT_ADDRESS, SqlFilePaths.ERP_Customers) as string[]

  const [oltPonAimResult, erpCustomersResult] = await Promise.allSettled([
    executeQuery<OltPonAim>(oltPonAimQueryString, DbName.A_BILLING),
    executeQuery<ErpCustomers>(erpCustomersQueryString, DbName.ERP)
  ])

  if (oltPonAimResult.status === 'rejected' || erpCustomersResult.status === 'rejected') {
    throw new H3Error('Failed to execute queries')
  }

  const oltPonAim = oltPonAimResult.value
  const erpCustomers = erpCustomersResult.value

  const result: {
    header: string[];
    body: UnionType[]
  } = {
    header: [],
    body: []
  }

  const lookup: Record<string, string> = {}
  for (const customer of erpCustomers.body) {
    lookup[customer.customerNumber] = customer.phone
  }

  for (const contract of oltPonAim.body) {
    const phone = lookup[contract['Պայմանագիր №']] || ''

    result.body.push({
      ...contract,
      phone
    })
  }

  return result
}, {
  maxAge: 60 * 60,
  name: 'aimPon'
})
