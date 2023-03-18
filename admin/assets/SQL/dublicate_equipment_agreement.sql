select equipment_history.equip_id, equipment_history.agrm_id, equipment_history.vg_id, equipment.chip_id, agreements.number
from billing.equipment_history
join (SELECT agrm_id FROM billing.equipment_history
where equipment_history.timeto is null
group by agrm_id
having count(agrm_id)>1) temp on equipment_history.agrm_id=temp.agrm_id
join equipment on equipment_history.equip_id=equipment.equip_id
join agreements on equipment_history.agrm_id=agreements.agrm_id
where equipment_history.timeto is null; 