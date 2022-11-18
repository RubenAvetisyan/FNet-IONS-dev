import { erpConnection } from '../LanBilling/bdConnect'
import { getQuery } from '../LanBilling/query'

const setGueryString = (user: string, password: string) => {
  return `SELECT title, description, email FROM erp.user where (login = "${user}" or email = "user") and password = "${password}";`
}

export default async function (user: string, password: string) {
  const queryString = setGueryString(user, password)
  return await getQuery(queryString, erpConnection)
}
