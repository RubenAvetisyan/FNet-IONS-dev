SELECT vgroups.vg_id, vgroups.login, vgroups.agrm_id, vgroups.blocked, equipment_history.timeto, equipment_history.equip_id, equipment.chip_id,
ifnull(devices.device_name,0) as device_name, right(ports.media, length(ports.media)-1) as port, gpon_ports.virtual_id as aim
FROM billing.vgroups
left join equipment_history on vgroups.agrm_id=equipment_history.agrm_id and equipment_history.timeto is null
left join equipment on equipment_history.equip_id=equipment.equip_id
left join gpon_ports on vgroups.vg_id=gpon_ports.vg_id left join ports on gpon_ports.port_id=ports.port_id left join devices on ports.device_id=devices.device_id
where vgroups.blocked <>10;