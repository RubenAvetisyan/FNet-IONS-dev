SELECT vgroups.login, accounts.name, tarifs.descr as tarifs, agreements.date as agrm_date, blocked, block_date, pay_date, payments.amount, accounts.phone, 
accounts.mobile, vgroups_addr.address
FROM billing.vgroups
left join agreements on vgroups.agrm_id=agreements.agrm_id
left join accounts on vgroups.uid=accounts.uid
left join vgroups_addr on vgroups.vg_id=vgroups_addr.vg_id
left join tarifs on vgroups.tar_id=tarifs.tar_id
left join payments on vgroups.agrm_id=payments.agrm_id
where tarifs.descr like '%domofon%' and blocked = 4 and payments.amount is not null
order by pay_date;