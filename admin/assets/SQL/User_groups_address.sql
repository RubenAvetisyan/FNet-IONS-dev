SELECT group_id, uid, vgroups.login, vgroups.vg_id, billing.vgroups_addr.country, billing.vgroups_addr.area, billing.vgroups_addr.city, billing.vgroups_addr.settl, 
billing.vgroups_addr.street, billing.vgroups_addr.building, billing.vgroups_addr.entrance, billing.vgroups_addr.floor, billing.vgroups_addr.flat, billing.vgroups_addr.address
FROM billing.usergroups_staff
join billing.vgroups using(uid) join billing.vgroups_addr using(vg_id)
where group_id=25;