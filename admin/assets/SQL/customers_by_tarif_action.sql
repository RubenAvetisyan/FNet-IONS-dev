SELECT billing.accounts.name as customer, billing.vgroups.login, billing.vgroups.vg_id, billing.vgroups.blocked, billing.tarifs.descr as Tarif,
billing.tarifs.tar_id, billing.actions.name as action_name, billing.groups.name as group_name, billing.accounts.phone, billing.accounts.mobile, 
vgroups_addr.address, action_staff.dtto
FROM billing.accounts
join billing.vgroups using(uid) join billing.gr_staff using(vg_id) left join billing.action_staff on billing.vgroups.vg_id=billing.action_staff.vg_id
join billing.groups using (group_id) join billing.tarifs on billing.vgroups.tar_id=billing.tarifs.tar_id 
left join billing.actions on billing.action_staff.action_id=billing.actions.record_id join vgroups_addr on vgroups.vg_id=vgroups_addr.vg_id
where billing.action_staff.archive<>1
and billing.actions.name like '%-3000%'
order by actions.name, tarifs.descr, login, dtto desc;