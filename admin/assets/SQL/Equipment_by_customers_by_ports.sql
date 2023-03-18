SELECT equipment_models.name, chip_id, timefrom, vgroups.login, equipment_history.agrm_id, agreements.number, accounts.name, vgroups_addr.address,
ifnull(devices.device_name,0) as device_name, right(ports.media, length(ports.media)-1) as port, gpon_ports.virtual_id as aim
FROM billing.equipment
left join equipment_history using(equip_id) left join vgroups on equipment_history.vg_id= vgroups.vg_id left join vgroups_addr on equipment_history.vg_id=vgroups_addr.vg_id
left join accounts on vgroups.login=accounts.login left join equipment_models using(model_id) join agreements on equipment_history.agrm_id=agreements.agrm_id
left join gpon_ports on vgroups.vg_id=gpon_ports.vg_id left join ports on gpon_ports.port_id=ports.port_id left join devices on ports.device_id=devices.device_id
where timeto is null;