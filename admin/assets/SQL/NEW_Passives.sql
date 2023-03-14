use billing;

DROP TABLE IF EXISTS temp_main;
CREATE TEMPORARY TABLE IF NOT EXISTS temp_main
SELECT 
billing.accounts.name, 
billing.accounts.login, 
concat(billing.accounts.phone, '\n', billing.accounts.mobile) as phone, 
billing.accounts_addr.address,
billing.agreements.date as agr_date, 
 billing.agreements.balance,
 (select max(ifnull(billing.payments.local_date,0)) from billing.payments where agrm_id = vgroups.agrm_id) as balance_date,
 billing.tarifs.descr as Tarif, 
 ifnull(billing.payments.amount,0) as amount, 
 ifnull(billing.payments.local_date,0) as payment_date, 
 ifnull(billing.groups.name,' ') as group_name, 
 billing.payments.mod_person, billing.payments.receipt as Transaction_code
 FROM billing.accounts 
 left join billing.accounts_addr using(uid) join billing.agreements using(uid) join billing.vgroups using(uid) join billing.tarifs using(tar_id) 
 left join billing.payments on billing.agreements.agrm_id = billing.payments.agrm_id join billing.gr_staff using(vg_id) left join billing.groups using(group_id)
 where billing.accounts_addr.type=0 and billing.vgroups.blocked <> 3 and ifnull(billing.payments.status,0) <> 2 and billing.groups.name <> 'Test'
 and ifnull(billing.payments.local_date,0) >= '2022-02-01'
 group by billing.accounts.login, ifnull(billing.payments.local_date,0)
 order by billing.accounts.login desc;
 
--  select * from temp_main
--  where payment_date >= '2022-12-01 00:00:00' and (payment_date <= migration_date or migration_date is null) and amount > 0;
 
select * from temp_main
left join billing.managers as M
	on M.person_id = temp_main.mod_person
where temp_main.payment_date >= '2022-02-01'