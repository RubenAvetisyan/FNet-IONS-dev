import { defineEventHandler, readBody } from 'h3'
import intersection from 'lodash.intersection'
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { readSql } from '~~/utils/readSQLFile'

const passiveCustomersQuerySrc = '../../admin/assets/SQL/ABilling/get_TV_tarrif_customers.sql'
const erpCustomersQuerySrc = '../../admin/assets/SQL/ERP/ERP_Customers.sql'

const customerMap = new Map()

interface Customer {
  contract: string;
  phone: string;
  [key: string]: string | number;
}

/**
 * Returns an array of contract numbers from the given list of passive customers,
 * and updates the customer map with the contract number as the key and the full object as the value.
 */
const getContractNumbers = async (customers: Customer[]): Promise<string[]> => {
  const contractNumbers = customers.map(({ contract, ...rest }) => {
    customerMap.set(contract, rest)
    return contract
  })
  return contractNumbers
}

/**
 * Returns an array of ERP customers that match the given contract numbers.
 */
const getErpCustomers = async (querySrc: string, contractNumbers: string[]): Promise<Customer[]> => {
  const queryString = readSql(querySrc).replace('contractNumbers', contractNumbers.join(','))
  const customers = await executeQuery(queryString, 'erp')
  return customers as Customer[]
}

/**
 * Returns an array of customers that includes phone numbers from the customer map if available.
 */
const getResponse = async (customers: Customer[]): Promise<Customer[]> => {
  const response = Promise.all(customers.map(({ phone, contract, ...rest }) => {
    const updatedPhone = intersection<string>(updatedPhone.replace(/\s/gim, '').split(',')).filter(s => s).join(', ')
    const fullObj = customerMap.get(contract) || {}

    return { contract, ...rest, ..fullObj, phone: updatedPhone }
  }))
  return response
}

export default defineEventHandler(async (event) => {
  try {
    customerMap.clear()
  // const { date, replacer } = await readBody(event)
  const queryString = readSql(passiveCustomersQuerySrc)
  const customers = await executeQuery(queryString, 'abilling') as Customer[]
  const contractNumbers = await getContractNumbers(customers)
  const erpCustomers = await getErpCustomers(erpCustomersQuerySrc, contractNumbers)
  console.log('erpCustomers: ', erpCustomers[0]);
  const response = await getResponse(erpCustomers)
  return response
  } catch (error) {
    console.log('error: ', error);
    return createError(JSON.stringify(error))
  }
})
