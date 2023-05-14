SELECT
	if(contract.scid, (select c.title from contract as c where c.id= contract.scid), contract.title) as contractNumber,
  TP.title as Tariff,
  TG.title as Tariff_group 
FROM contract
LEFT JOIN contract_tariff as CT ON CT.cid = contract.id
LEFT JOIN tariff_group_tariff as TGT ON TGT.tpid = CT.tpid
LEFT JOIN tariff_plan as TP ON TP.id = TGT.tpid
LEFT JOIN billing.tariff_group as TG ON TGT.tgid
WHERE TGT.tgid IN (9, 16) AND TGT.date2 IS NULL AND contract.title NOT LIKE '3000%'
GROUP BY LEFT(contract.title, 7)