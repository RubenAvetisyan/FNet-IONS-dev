SELECT billing.vgroups.login, billing.promise_payments.amount as promise_amount, 
billing.promise_payments.prom_date, billing.promise_payments.prom_till, billing.promise_payments.debt, billing.managers.fio as manager, 
if(billing.payments.amount<>'',billing.payments.amount,'') as payed_amount, if(billing.payments.pay_date like '%-%',billing.payments.pay_date,'') as pay_date,
if(billing.payments.comment<>'',billing.payments.comment,'') as comment, if(billing.vgroups.blocked=0,'ACT',if(billing.vgroups.blocked=4,'BL',null)) as status, 
if(billing.vgroups.blocked=4,billing.vgroups.block_date,'') as block_date, billing.accounts.name as cust_name, billing.accounts.phone, billing.accounts.mobile
FROM billing.promise_payments
join billing.managers on billing.promise_payments.mod_person=billing.managers.person_id left join billing.payments on 
billing.promise_payments.pay_id=billing.payments.record_id join billing.agreements on billing.promise_payments.agrm_id=billing.agreements.agrm_id
join billing.vgroups on billing.agreements.uid=billing.vgroups.uid left join billing.accounts on billing.vgroups.login=billing.accounts.login
where billing.vgroups.blocked<>10 and billing.vgroups.login not like '%test%' and prom_date > '2022-08-01'
order by prom_date;