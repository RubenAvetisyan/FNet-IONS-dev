import { DbName } from './../../../utils/MySQL/connection-class';
import { H3Error } from 'h3'
import { executeQuery } from '../sync/getPaymentsFromLanBilling'
import transfrom from '../user/response-transfrom'
import { queryBuilder } from './loginQuery'

export default async function (user: string, password: string): Promise<AuthResult | H3Error> {
  try {
    const queryString = queryBuilder(user, password)

    const reponse = await executeQuery<AuthResponse>(queryString, DbName.ERP)
    // console.log('LOGIN reponse: ', reponse);

    const result = transfrom(reponse.body)
    return result
  } catch (error) {
    throw error
  }
}
