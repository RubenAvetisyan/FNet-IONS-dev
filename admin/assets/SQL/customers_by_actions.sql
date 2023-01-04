SELECT billing.accounts.name as customer, billing.vgroups.login, if(billing.vgroups.blocked=0,'ACT','BLOCK') as status, billing.vgroups.block_date, 
billing.tarifs.descr as Tarif, billing.actions.name as action_name, billing.action_staff.dtfrom,
billing.action_staff.dtto, billing.groups.name as group_name, billing.accounts.phone, billing.accounts.mobile, vgroups_addr.address
FROM billing.action_staff
join billing.actions on billing.action_staff.action_id=billing.actions.record_id join billing.vgroups using(vg_id) join billing.gr_staff using(vg_id)
join billing.groups on billing.gr_staff.group_id = groups.group_id
join billing.accounts using(login) join billing.tarifs on billing.vgroups.tar_id=billing.tarifs.tar_id
left join vgroups_addr on vgroups.vg_id=vgroups_addr.vg_id
where billing.action_staff.dtto like '%2022-11%'  and billing.groups.name <> 'block' and billing.groups.name <> 'перерасчет' and billing.groups.name <> 'Kineskop'
and billing.actions.name like '%Net_%';