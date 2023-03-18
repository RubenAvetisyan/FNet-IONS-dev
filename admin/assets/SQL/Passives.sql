SELECT billing.accounts.name, billing.accounts.login, billing.accounts.phone, billing.accounts.mobile, billing.accounts_addr.address, billing.agreements.date as agr_date, 
 billing.agreements.balance, billing.vgroups.block_date, billing.tarifs.descr as Tarif, ifnull(billing.payments.amount,0) as amount, 
 ifnull(billing.payments.local_date,0) as payment_date, ifnull(billing.groups.name,' ') as group_name
 FROM billing.accounts 
 left join billing.accounts_addr using(uid) join billing.agreements using(uid) join billing.vgroups using(uid) join billing.tarifs using(tar_id) 
 left join billing.payments on billing.agreements.agrm_id = billing.payments.agrm_id join billing.gr_staff using(vg_id) left join billing.groups using(group_id)
 where billing.accounts_addr.type=0 and billing.vgroups.blocked = 4 and ifnull(billing.payments.status,0) <> 2 and billing.groups.name <> 'Test';
