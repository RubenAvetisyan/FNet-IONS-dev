import { defineEventHandler } from 'h3'
import intersection from 'lodash.intersection'
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { readSqlFile } from '~~/utils/readSQLFile'

const passiveCustomersQuerySrc = '../../admin/assets/SQL/ABilling/as_lan_accounts_last.sql'
const erpCustomersQuerySrc = '../../admin/assets/SQL/ERP/ERP_Customers.sql'
const lanContractsWithConDates = '../../admin/assets/SQL/ABilling/USE_IN_LANBILLING_DB.sql'

const map: Map<string, any> = new Map()


const getContractNumbers = async (passiveCustomers: {}[]) => Promise.all(passiveCustomers.map((obj: any) => {
    if (map)
        map.set(obj[`Договор`], obj)

    return obj[`Договор`]
}))
async function getERPCustomers(erpCustomersQuerySrc: string, passiveCustomers: {}[], db: 'erp' | 'lanbilling'): Promise<{ [key: string]: number | string }[]> {
    const contractNumbers = await getContractNumbers(passiveCustomers)

    let queryStringErpCustomers = await readSqlFile(erpCustomersQuerySrc)
    queryStringErpCustomers = queryStringErpCustomers.replace('contractNumbers', [...new Set(contractNumbers)].join(','))

    return executeQuery(queryStringErpCustomers, db) as any
}

const getResponse = async (erpCustomers: {}[]) => {
    return Promise.all(erpCustomers.map((customers: any) => {
        // customers.phone = customers.phone.split(',').join(', ')

        if (!map)
            return { ...customers }

        customers.phone = intersection<string>(customers.phone.replace(/\s/gim, '').split(',')).filter(s => s).join(', ')

        const fullObj = map.get(customers.contract)
        return { ...customers, ...fullObj }
    }))
}

export default defineEventHandler(async () => {
    map.clear()
    const queryStringPassiveCustomers = await readSqlFile(passiveCustomersQuerySrc)
    let passiveCustomers = await executeQuery(queryStringPassiveCustomers, 'abilling') as any
    passiveCustomers = [...new Set(passiveCustomers)]
    const erpCustomers = await getERPCustomers(erpCustomersQuerySrc, passiveCustomers, 'erp')
    const response = await getResponse(erpCustomers)
    const lanCustomers = await getERPCustomers(lanContractsWithConDates, passiveCustomers, 'lanbilling')
    console.log('lanCustomers: ', lanCustomers.length);
    response.forEach((obj) => {
        lanCustomers.forEach((lan) => {
            if (lan.login === obj[`Договор`]) {
                obj[`Дата подключения`] = `${lan.date}`.replace('T20:00:00.000Z', '')
                Object.keys(obj).forEach(k => {
                    if (obj[k].includes('T20:00:00.000Z'))
                        obj[k].replace('T20:00:00.000Z', '')
                })
            }
        })
    })

    return response
})
