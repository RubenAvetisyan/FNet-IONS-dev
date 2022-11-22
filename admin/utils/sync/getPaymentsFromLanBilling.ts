import { H3Error, createError } from 'h3'
import { lanbillingConnection } from '../LanBilling/bdConnect'
import { getQuery } from '../LanBilling/query'

const query = (date: string) => `select 
  b.vg_id, c.agrm_id,
  payments.amount as Amount,
  c.login as CONTRACT_ID,
  payments.pay_date as DtTime,
  d.login as PaymentSystemName,
  payments.receipt as TransactID
from billing.groups as a
inner join billing.gr_staff as b
inner join billing.vgroups as c
inner join billing.managers as d
inner join billing.payments as payments
  on a.group_id = 29
  and a.group_id = b.group_id
  and b.vg_id = c.vg_id
  and payments.agrm_id = c.agrm_id
  and payments.pay_date >= "${date}"
  and payments.mod_person = d.person_id
  and (payments.mod_person = 13 or payments.mod_person =14 or payments.mod_person = 94)
order by pay_date desc`

export const getPayments = async (date: string): Promise<any> => {
  const queryString = query(date)
  const billing = await lanbillingConnection
  if (!billing || billing instanceof H3Error)
    return createError('the lanbillingConnection DB conncetion is faild')

  return getQuery(queryString, billing)
}
