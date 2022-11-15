import type { Connection } from 'mysql'

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

export const getPayments = async (connection: Connection, date: string) => {
  return new Promise((resolve, reject) => {
    // third argument is optional, but can be as fields
    connection.query(query(date), (error: any, results: any[]) => {
      if (error)
        reject(error)

      resolve(results)
    })
  })
}
