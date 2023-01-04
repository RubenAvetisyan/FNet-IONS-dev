select 
  b.vg_id, c.agrm_id,
  sum(payments.amount) as Amount,
  d.position as 'position',
  c.login as CONTRACT_ID,
  payments.pay_date as DtTime,
  d.login as PaymentSystemName,
  payments.receipt as TransactID
from billing.groups as a
inner join billing.gr_staff as b
inner join billing.vgroups as c
inner join billing.managers as d
inner join billing.payments as payments
  on a.group_id = 26
  and a.group_id = b.group_id
  and b.vg_id = c.vg_id
  and payments.agrm_id = c.agrm_id
  and payments.pay_date > '?'
  and payments.mod_person = d.person_id
  and d.person_id in (
	select m.person_id as persons from billing.manager_roles as m
    join billing.roles as r on r.role_id = m.role_id
	)
group by c.login
order by pay_date desc;