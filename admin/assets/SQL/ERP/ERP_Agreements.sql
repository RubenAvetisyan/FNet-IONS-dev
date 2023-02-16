SELECT distinct agreements.uid, agreements.agrm_id, number, date as agrm_date, balance, ifnull(agreements.descr,'') as descr
FROM billing.agreements
left join vgroups on agreements.uid=vgroups.uid
left join gpon_ports on vgroups.vg_id=gpon_ports.vg_id left join ports on gpon_ports.port_id=ports.port_id 
left join devices on ports.device_id=devices.device_id 
left join devices_options on ifnull(devices.device_id,11111)=devices_options.device_id and devices_options.name='Agent-Remote-Id'
where devices_options.value='10.130.12.2'
order by uid asc;