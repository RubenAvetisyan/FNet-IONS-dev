SELECT if(vgroups.blocked=4,'BAL.BLCK',if(vgroups.blocked=3,'ADM.BLCK','ACTIVE')) as status, vgroups.block_date, devices.device_name, 
billing.devices_options.value as IP, billing.ports.media as port, right(billing.ports.media, length(billing.ports.media)-1) as port_1, 
right(billing.ports.media, length(billing.ports.media)-3) as port_11,
billing.gpon_ports.virtual_id as aim, billing.vgroups.login, billing.tarifs.descr as tarif, billing.groups.name as group_name, 
accounts.name, vgroups.descr, accounts.phone, accounts.mobile, vgroups_addr.address
FROM billing.ports 
left join gpon_ports on ports.port_id=gpon_ports.port_id left join billing.devices using(device_id) left join billing.devices_options using(device_id)
left join billing.vgroups on billing.gpon_ports.vg_id=billing.vgroups.vg_id left join billing.tarifs on billing.vgroups.tar_id=billing.tarifs.tar_id 
left join billing.gr_staff on billing.vgroups.vg_id=billing.gr_staff.vg_id left join billing.groups using(group_id) left join accounts using(uid) 
left join vgroups_addr on billing.gpon_ports.vg_id=vgroups_addr.vg_id
where billing.devices_options.name='Agent-Remote-Id' and groups.name <> 'Kineskop' and groups.name <> 'Test'
and (devices_options.value = '10.130.1.2' 
or devices_options.value = '10.130.1.3' or devices_options.value = '10.130.1.4' or devices_options.value = '10.130.1.5' 
or devices_options.value = '10.130.3.5' or devices_options.value = '10.1303.6' or devices_options.value = '10.130.3.7' 
or devices_options.value = '10.130.3.8' or devices_options.value = '10.130.3.13' or devices_options.value = '10.130.3.14'
or devices_options.value = '10.130.4.32' or devices_options.value = '10.130.5.6' or devices_options.value = '10.130.5.12' 
or devices_options.value = '10.130.5.22' or devices_options.value = '10.130.5.23' or devices_options.value = '10.130.6.2' 
or devices_options.value = '10.130.6.14' or devices_options.value = '10.130.7.6' or devices_options.value = '10.130.7.7'
or devices_options.value = '10.130.8.5' or devices_options.value = '10.130.9.2' or devices_options.value = '10.130.9.3' 
or devices_options.value = '10.130.9.4' or devices_options.value = '10.130.9.5' or devices_options.value = '10.130.9.6' 
or devices_options.value = '10.130.11.2' or devices_options.value = '10.130.11.3' or devices_options.value = '10.130.11.4' 
or devices_options.value = '10.130.12.2')
order by IP, port, aim;