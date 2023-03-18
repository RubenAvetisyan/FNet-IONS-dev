SELECT 
    LEFT(contract.title,
        LOCATE('/', contract.title) - 1) AS 'պայմանգրի №',
    LEFT(CONCAT(contract.status_date, ''),
        10) AS 'Վերջին լոկավեման ամսաթիվ',
    city.title AS 'քաղաք',
    area.title AS 'համայնտք/շրջն/գյուղ',
    quarter.title AS 'տարածք',
    street.title AS 'թեղոց',
    CONCAT(house.house,
            house.frac,
            ' ',
            house.comment) AS 'տուն',
    tariff_plan.title AS 'տարիֆ', 
    Case
		when status.status = 3 then 'փակ'
		when status.status = 0 then 'Ակտիվ'
        when status.status = 7 then 'չի վճարվում'
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
        AND tariff_plan.title in ('Domofon 400', 'Domofon 1000')
GROUP BY scid