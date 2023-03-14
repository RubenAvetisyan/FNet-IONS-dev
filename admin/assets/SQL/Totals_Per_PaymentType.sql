 SELECT billing.managers.person_id, billing.managers.fio as PaymentSystem, count(billing.payments.agrm_id), sum(billing.payments.amount)
 FROM billing.vgroups  
 left join billing.accounts on vgroups.uid = accounts.uid
 left join billing.agreements on vgroups.uid = agreements.uid
 left join billing.payments on billing.vgroups.agrm_id=billing.payments.agrm_id
 left join billing.managers on billing.managers.person_id = billing.payments.mod_person
 where billing.vgroups.blocked=4 and billing.vgroups.archive=0
 and year(pay_date) = 2023 and month(pay_date) = 1 group by billing.managers.person_id