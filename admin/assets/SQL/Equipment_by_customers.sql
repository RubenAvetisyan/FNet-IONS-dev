SELECT  equipment_models.name, chip_id, timefrom, vgroups.login, equipment_history.agrm_id, agreements.number, accounts.name, vgroups_addr.address
FROM billing.equipment
join equipment_history using(equip_id) left join vgroups on equipment_history.vg_id= vgroups.vg_id left join vgroups_addr on equipment_history.vg_id=vgroups_addr.vg_id
left join accounts on vgroups.login=accounts.login join equipment_models using(model_id) join agreements on equipment_history.agrm_id=agreements.agrm_id
where timeto is null;