SELECT billing.ports.port_id, billing.ports.device_id, billing.ports.name, billing.gpon_ports.virtual_id, billing.gpon_ports.vg_id, billing.devices.device_name, 
billing.devices_options.value, billing.ports.media
FROM billing.ports inner join gpon_ports on ports.port_id=gpon_ports.port_id join billing.devices using(device_id) join billing.devices_options using(device_id)
where billing.devices_options.name='Agent-Remote-Id';
