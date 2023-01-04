SELECT billing.ports.port_id, billing.ports.device_id, billing.ports.name, billing.gpon_ports.vg_id, billing.devices.device_name, 
billing.devices_options.value as IP, billing.ports.media as port, billing.gpon_ports.virtual_id as aim, billing.vgroups.login, billing.tarifs.descr as tarif
FROM billing.ports inner join gpon_ports on ports.port_id=gpon_ports.port_id join billing.devices using(device_id) join billing.devices_options using(device_id)
join billing.vgroups on billing.gpon_ports.vg_id=billing.vgroups.vg_id join billing.tarifs on billing.vgroups.tar_id=billing.tarifs.tar_id
where billing.devices_options.name='Agent-Remote-Id'
and devices_options.value = '10.130.1.4' and ports.media = 'g0/15';
