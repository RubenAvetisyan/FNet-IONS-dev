SELECT 
    cid,
    contract_tariff.tpid,
    tariff_plan.title AS `Domofon - Տարիֆ`,
    COUNT(contract_tariff.id) AS Քանակ
FROM
    contract_tariff
        INNER JOIN
    contract ON contract_tariff.cid = contract.id
        LEFT JOIN
    tariff_plan ON contract_tariff.tpid = tariff_plan.id
WHERE
    tariff_plan.title LIKE '%Domofon%'
		AND tariff_plan.title NOT LIKE 'Domofon_CAM Service'
		AND LEFT(contract.title, 1) > 3
		AND contract.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|Անուն|անուն|ազգանուն|Ազգանուն)'
GROUP BY contract_tariff.tpid , tariff_plan.title 
UNION SELECT 
    NULL, NULL, 'TOTAL', COUNT(contract_tariff.id)
FROM
    contract_tariff
        INNER JOIN
    contract ON contract_tariff.cid = contract.id
        LEFT JOIN
    tariff_plan ON contract_tariff.tpid = tariff_plan.id
WHERE
    tariff_plan.title LIKE '%Domofon%'
		AND tariff_plan.title NOT LIKE 'Domofon_CAM Service'
		AND LEFT(contract.title, 1) > 3
		AND contract.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|Անուն|անուն|ազգանուն|Ազգանուն)'