SELECT LEFT(contract.title, 7) as contractNumber, trim(group_concat(DISTINCT tariff_group.title SEPARATOR ',')) as `tariff_group`, 
group_concat(DISTINCT tariff_plan.title SEPARATOR ',') as `tariff` FROM contract
LEFT JOIN (SELECT cid, gid, max(date1) FROM contract_tariff_group group by cid) as TG ON TG.cid = contract.id
LEFT JOIN tariff_group ON tariff_group.id = TG.gid
LEFT JOIN contract_tree_link ON contract_tree_link.cid = coalesce(contract.id, contract.scid)
LEFT JOIN (SELECT cid, tpid, max(date1) FROM contract_tariff group by cid) as CT ON CT.cid = contract.id
LEFT JOIN tariff_plan ON (tariff_plan.id = CT.tpid OR tariff_plan.tree_id = contract_tree_link.cid) AND tariff_plan.actual=1
WHERE CT.cid IS NOT NULL AND tariff_plan.id NOT IN (5, 22) AND tariff_plan.title NOT LIKE '%Archive%'
group by contractNumber