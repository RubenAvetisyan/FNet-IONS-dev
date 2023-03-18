SELECT vgroups.login, accounts.name, tarifs.descr as tarifs, vgroups.creation_date, agreements.date as agrm_date, 
if(vgroups.blocked=0,'ACT',if(vgroups.blocked=4,'BAL_BLCK',if(vgroups.blocked=3,'ADM_BLCK','ARCHIVE'))) as status, vgroups.block_date, accounts.phone, 
accounts.mobile, vgroups_addr.address
FROM billing.vgroups
left join agreements on vgroups.agrm_id=agreements.agrm_id
left join accounts on vgroups.uid=accounts.uid
left join vgroups_addr on vgroups.vg_id=vgroups_addr.vg_id
left join tarifs on vgroups.tar_id=tarifs.tar_id
where vgroups.creation_date >='2022-05-01';