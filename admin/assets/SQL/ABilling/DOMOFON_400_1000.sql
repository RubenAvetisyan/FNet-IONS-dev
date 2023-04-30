use billing;

SELECT
    LEFT(contract.title,
        LOCATE('/', contract.title) - 1) AS 'պայմանգրի №',
    LEFT(CONCAT(contract.status_date, ''),
        10) AS 'Վերջին բլոկավորման ամսաթիվ',
    city.title AS 'Քաղաք',
    area.title AS 'Համայնտք/շրջն/գյուղ',
    quarter.title AS 'Տարածք',
    street.title AS 'Փողոց',
    CONCAT(house.house,
            house.frac,
            ' ',
            house.comment) AS 'տուն',
    tariff_plan.title AS 'տարիֆ', 
    Case
		WHEN contract.`status` = 0 THEN 'Ակտիվ'
				 WHEN contract.`status` = 2 THEN 'անջատված'
				 WHEN contract.`status` = 3 THEN 'փակ'
				 WHEN contract.`status` = 4 THEN 'կասեցված'
				 WHEN contract.`status` = 6 THEN 'միացված չէ'
				 WHEN contract.`status` = 7 THEN 'Պասիվ'
	END as 'կարգավիճակ'
FROM
    billing.contract
        JOIN contract_status  AS status ON status.cid = contract.id
        LEFT JOIN
    contract_parameter_type_2 AS param2 ON param2.cid = contract.id
        LEFT JOIN
    contract_tariff ON contract_tariff.cid = contract.id
        LEFT JOIN
    address_house AS house ON param2.hid = house.id
        LEFT JOIN
    address_area AS area ON house.areaid = area.id
        LEFT JOIN
    address_quarter AS quarter ON house.quarterid = quarter.id
        LEFT JOIN
    address_street AS street ON house.streetid = street.id
        LEFT JOIN
    address_city AS city ON street.cityid = city.id
        LEFT JOIN
    tariff_plan ON tariff_plan.id = contract_tariff.tpid
WHERE
    LEFT(contract.title, 1) > 3
        AND param2.address NOT LIKE ('%ест%')
        AND param2.address NOT LIKE ('%Նոր Արեշ 11, д. 91%')
        AND contract.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|Անուն|անուն|ազգանուն|Ազգանուն)'
        AND tariff_plan.title LIKE '%Domofon%'
        AND tariff_plan.title NOT LIKE 'Domofon_CAM Service'
GROUP BY scid