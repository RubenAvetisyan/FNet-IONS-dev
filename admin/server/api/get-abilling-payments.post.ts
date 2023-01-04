import { getPayments } from '~~/admin/utils/sync/getPaymentsFromLanBilling'
import { formatToSqlDate } from '@/utils/dateTime'
import { defineEventHandler, readBody } from 'h3'

const query = (date: string) => `select
	cp.id as 'Transaction ID',
	ct.title as 'Contract ID',
    ct.comment as 'User',
    cp.summa as 'Payment sum',
    cp.comment as 'Transaction Type',
    cp.lm as 'Syncronization Date'
FROM billing.contract as ct
inner join billing.contract_payment as cp
on ct.id = cp.cid
where
	lm > "${formatToSqlDate(date)}"
	and (cp.pt = 11
	or cp.pt = 12
	or cp.pt = 13
	)
order by cp.lm desc`

export default defineEventHandler(async (event) => {
  const { date } = await readBody(event)
  const queryString = query(date)
  const response = await getPayments(queryString, 'abilling')

  return response
})