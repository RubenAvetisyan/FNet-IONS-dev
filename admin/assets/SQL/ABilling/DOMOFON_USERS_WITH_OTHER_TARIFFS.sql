SELECT 
  `Domofon - Տարիֆ`,
  SUM(`total`) AS `total_sum`
FROM (
  SELECT 
    COUNT(contract_tariff.tpid) AS `total`,
    contract_tariff.cid,
    contract.scid,
    contract_tariff.tpid,
    tariff_plan.title AS `Domofon - Տարիֆ`
  FROM contract_tariff
  INNER JOIN contract ON contract_tariff.cid = contract.id
  LEFT JOIN tariff_plan ON contract_tariff.tpid = tariff_plan.id
  WHERE 
    contract_tariff.tpid NOT IN (60, 61)
    AND LEFT(contract.title, 1) > 3
    AND contract.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|Անուն|անուն|ազգանուն|Ազգանուն)'
  GROUP BY contract.scid
) AS c
INNER JOIN (
  SELECT contract.scid
  FROM contract_tariff
  INNER JOIN contract ON contract_tariff.cid = contract.id
  LEFT JOIN tariff_plan ON contract_tariff.tpid = tariff_plan.id
  WHERE 
    contract_tariff.tpid IN (60, 61)
    AND LEFT(contract.title, 1) > 3
    AND contract.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|Անուն|անուն|ազգանուն|Ազգանուն)'
  GROUP BY contract.id
) AS DMC ON DMC.scid = c.scid
GROUP BY c.tpid WITH ROLLUP;
