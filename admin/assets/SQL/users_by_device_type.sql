SELECT vgroups.login, equipment.chip_id, accounts.name, vgroups_addr.address
FROM billing.device_groups_members
join ports using(device_id) join gpon_ports using(port_id) join vgroups on gpon_ports.vg_id=vgroups.vg_id 
left join equipment_history on gpon_ports.vg_id=equipment_history.vg_id left join equipment using(equip_id) left join accounts using(login) 
left join vgroups_addr on gpon_ports.vg_id=vgroups_addr.vg_id
where device_groups_members.group_id=12 and vgroups.archive=0 and equipment_history.timeto is null;