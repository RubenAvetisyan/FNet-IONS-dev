import { H3Error } from 'h3'
import { erpConnection } from '../LanBilling/bdConnect'
import { getQuery } from '../LanBilling/query'
import { config } from '@/Config'

const tableName = config.isTest ? 'erp' : 'erp.user'

const setQueryString = (user: string, password: string) => {
  return `SELECT title, description, email FROM ${tableName} where (login = "${user}" or email = "user") and password = "${password}";`
}

export default async function (user: string, password: string) {
  const queryString = setQueryString(user, password)
  const erp = await erpConnection

  if (erp instanceof H3Error) return erp

  return await getQuery(queryString, erp)
}