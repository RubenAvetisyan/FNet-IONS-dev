select 
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
  and payments.pay_date > (
	select pay_date from billing.vgroups as c
    join billing.payments as p on p.agrm_id = c.agrm_id
    where login = '?'
    order by pay_date
    desc limit 1
  )
  and payments.mod_person = d.person_id
  and payments.mod_person in (13, 14, 94)
order by pay_date desc