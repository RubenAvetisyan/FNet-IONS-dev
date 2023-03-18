SELECT vgroups.login, vgroups.blocked, if(vgroups.blocked=0,'',vgroups.block_date) as block_date, accounts.name, accounts.phone, accounts.mobile,
vgroups_addr.address, agreements.date as agrm_date, agreements.balance, tarifs.descr as Tarif, billing.groups.name as gr_name
FROM billing.vgroups
left join accounts using(uid) left join vgroups_addr using(vg_id) left join agreements using(agrm_id) left join tarifs using(tar_id) 
left join gr_staff using(vg_id) left join billing.groups using(group_id)
where vgroups.blocked<>0 and groups.name ='Kineskop' and block_date like '%2022-11%';