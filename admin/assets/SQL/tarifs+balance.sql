 SELECT billing.vgroups.login, billing.accounts.name, billing.accounts.mobile, billing.accounts.phone, billing.tarifs.descr as Tarif,
 billing.service_categories.above as price, billing.agreements.balance, if(billing.services.serv_cat_idx=1,0,2000) as add_service, billing.payments.amount, 
 ifnull(billing.payments.pay_date,0) as pay_date
 FROM billing.vgroups  
 join billing.accounts using(uid) join billing.tarifs using(tar_id) join billing.service_categories using(tar_id) join billing.agreements using(uid) 
 join billing.services on billing.vgroups.vg_id=billing.services.vg_id left join billing.payments on billing.vgroups.agrm_id=billing.payments.agrm_id
 where billing.vgroups.blocked=4 and billing.vgroups.archive=0 and billing.vgroups.acc_ondate like '%-11 00%' and billing.service_categories.serv_cat_idx=1 and balance < above 
 and billing.services.timeto like '%9999-%' and billing.tarifs.descr = 'inet20 5900' and pay_date like '%2022-04%' order by login;