SELECT accounts.name, vgroups.vg_id, vgroups.login, vgroups.agrm_id, vgroups_addr.address, groups.name as gr_name, vgroups.blocked as 'status', vgroups.block_date, 
vgroups.tar_id, service_categories.above as tarif_price, tariff_modifiers.name as action_name, action_staff.action_id, services.timefrom, tariff_modifiers.rent, 
tariff_modifiers.rate, tarifs_rasp.tar_id_new as new_tar_id, temp1.above as new_tarif_price, tarifs_rasp.change_time as new_timefrom, 
temp2.name as new_action_name, temp5.action_id as new_action_id, temp2.rent as new_rent, temp2.rate as new_rate, devices.device_name, devices_options.value as IP_addr, 
right(ports.media, length(ports.media)-1) as port, gpon_ports.virtual_id as aim, equipment.chip_id, temp4.uuid as additional_service, temp4.service_cat_id as add_serv_cat_id,
temp4.above as addit_serv_price, temp3.timefrom as addit_serv_timefrom, vgroups.acc_ondate
FROM billing.vgroups
left join vgroups_addr on vgroups.vg_id=vgroups_addr.vg_id left join gr_staff on vgroups.vg_id=gr_staff.vg_id 
left join billing.groups on gr_staff.group_id=groups.group_id
left join service_categories on vgroups.tar_id=service_categories.tar_id and service_categories.serv_cat_idx=1
left join services on vgroups.vg_id=services.vg_id and services.serv_cat_idx=1
left join tariff_modifiers on services.service_id=tariff_modifiers.service_id left join action_staff on tariff_modifiers.action_staff_id=action_staff.record_id 
left join tarifs_rasp on vgroups.vg_id=tarifs_rasp.vg_id
left join service_categories temp1 on ifnull(tarifs_rasp.tar_id_new,11111)=temp1.tar_id and temp1.serv_cat_idx=1
left join tariff_modifiers temp2 on (vgroups.vg_id=temp2.vg_id and ifnull(tarifs_rasp.tar_id_new,11111)=temp2.tar_id and tarifs_rasp.change_time=temp2.timefrom)
left join action_staff temp5 on temp2.action_staff_id=temp5.record_id
left join gpon_ports on vgroups.vg_id=gpon_ports.vg_id left join ports on gpon_ports.port_id=ports.port_id 
left join devices on ports.device_id=devices.device_id 
left join devices_options on ifnull(devices.device_id,11111)=devices_options.device_id and devices_options.name='Agent-Remote-Id'
left join equipment_history on vgroups.vg_id=equipment_history.vg_id and equipment_history.timeto is null
left join equipment on equipment_history.equip_id=equipment.equip_id
left join services temp3 on vgroups.vg_id=temp3.vg_id and vgroups.tar_id=temp3.tar_id and temp3.serv_cat_idx=2 and temp3.timeto>now()
left join service_categories temp4 on vgroups.tar_id=temp4.tar_id and temp4.serv_cat_idx=2 and temp3.timeto>now()
left join accounts on vgroups.login = accounts.login
where blocked <> 10 and ifnull(groups.name,'') <> 'Kineskop' and ifnull(groups.name,'') <> 'Test' and services.state=3 
and (tarifs_rasp.change_time like '%2022-11-21%' or tarifs_rasp.change_time like '%2022-11-22%') and tariff_modifiers.name not like '%Net_50%'
order by block_date desc;