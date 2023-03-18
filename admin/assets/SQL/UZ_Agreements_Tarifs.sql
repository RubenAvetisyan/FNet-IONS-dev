SELECT accounts.name, vgroups.login, vgroups.creation_date, agreements.date as agrm_date, vgroups_addr.address, groups.name as gr_name, 
if(vgroups.blocked=0,'ACT',if(vgroups.blocked=4,'BAL_BLCK',if(vgroups.blocked=3,'ADM_BLCK','ARCHIVE'))) as status, vgroups.block_date, 
tarifs.descr as tarif, service_categories.above as tarif_price, services.timefrom, tariff_modifiers.rent, 
tariff_modifiers.rate, tar1.descr as new_tarif, temp1.above as new_tarif_price, tarifs_rasp.change_time as new_timefrom, 
temp2.name as new_action_name, temp5.action_id as new_action_id, temp2.rent as new_rent, temp2.rate as new_rate
FROM billing.vgroups
left join vgroups_addr on vgroups.vg_id=vgroups_addr.vg_id 
left join agreements on vgroups.agrm_id=agreements.agrm_id
left join gr_staff on vgroups.vg_id=gr_staff.vg_id 
left join billing.groups on gr_staff.group_id=groups.group_id
left join service_categories on vgroups.tar_id=service_categories.tar_id and service_categories.serv_cat_idx=1
left join services on vgroups.vg_id=services.vg_id and services.serv_cat_idx=1
left join tariff_modifiers on services.service_id=tariff_modifiers.service_id 
left join action_staff on tariff_modifiers.action_staff_id=action_staff.record_id 
left join tarifs_rasp on vgroups.vg_id=tarifs_rasp.vg_id
left join tarifs tar1 on tarifs_rasp.tar_id_new=tar1.tar_id
left join service_categories temp1 on ifnull(tarifs_rasp.tar_id_new,11111)=temp1.tar_id and temp1.serv_cat_idx=1
left join tariff_modifiers temp2 on (vgroups.vg_id=temp2.vg_id and ifnull(tarifs_rasp.tar_id_new,11111)=temp2.tar_id and tarifs_rasp.change_time=temp2.timefrom)
left join action_staff temp5 on temp2.action_staff_id=temp5.record_id
left join gpon_ports on vgroups.vg_id=gpon_ports.vg_id 
left join ports on gpon_ports.port_id=ports.port_id 
left join devices on ports.device_id=devices.device_id 
left join devices_options on ifnull(devices.device_id,11111)=devices_options.device_id and devices_options.name='Agent-Remote-Id'
left join equipment_history on vgroups.vg_id=equipment_history.vg_id and equipment_history.timeto is null
left join equipment on equipment_history.equip_id=equipment.equip_id
left join services temp3 on vgroups.vg_id=temp3.vg_id and vgroups.tar_id=temp3.tar_id and temp3.serv_cat_idx=2 and temp3.timeto>now()
left join service_categories temp4 on vgroups.tar_id=temp4.tar_id and temp4.serv_cat_idx=2 and temp3.timeto>now()
left join accounts on vgroups.login = accounts.login
left join tarifs on vgroups.tar_id=tarifs.tar_id
where blocked <> 10 and ifnull(groups.name,'') <> 'Kineskop' and ifnull(groups.name,'') <> 'Test' and ifnull(groups.name,'') <> 'Texapoxvac' and services.state=3 
and accounts.type=1
order by creation_date desc;