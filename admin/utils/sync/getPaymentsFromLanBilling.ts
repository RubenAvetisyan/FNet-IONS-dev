import { switchCase } from '@babel/types'
import { H3Error, createError } from 'h3'
import { lanbillingConnection, abillingConnection } from '../LanBilling/bdConnect'
import { getQuery } from '../LanBilling/query'

export const getPayments = async (queryString: string, paymentSystem: string): Promise<PaymentsResponseType[] | H3Error | string> => {
  const billing = await getBillingDb(paymentSystem)
  if (!billing || billing instanceof H3Error)
    return createError('the lanbillingConnection DB conncetion is faild')

  return getQuery(queryString, billing)
}

function getBillingDb(paymentSystem: string) {
  switch (paymentSystem.toLowerCase()) {
    case 'lanbilling':
      return lanbillingConnection
    case 'abilling':
      return abillingConnection

    default:
      break;
  }
}
