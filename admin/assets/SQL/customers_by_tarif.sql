SELECT vgroups.login, accounts.name, vgroups.vg_id, vgroups.agrm_id, if(vgroups.blocked=4,'BAL.BLCK',if(vgroups.blocked=3,'ADM.BLCK','ACTIVE')) as status, block_date, 
vgroups.tar_id, acc_ondate, agreements.balance, billing.vgroups_addr.address, vgroups.descr
FROM billing.vgroups 
join agreements on vgroups.login=agreements.number left join billing.vgroups_addr using(vg_id) left join accounts using(login)
where tar_id =181
order by vg_id;