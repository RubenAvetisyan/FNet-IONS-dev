SELECT 
    LEFT(contract.title,
        LOCATE('/', contract.title) - 1) AS 'contract',
    LEFT(CONCAT(contract.status_date, ''),
        10) AS 'blockDate',
    city.title AS 'city',
    area.title AS 'area',
    quarter.title AS 'quarter',
    street.title AS 'street',
    CONCAT(house.house,
            house.frac,
            ' ',
            house.comment) AS 'house',
    concat(GROUP_CONCAT(tariff_plan.title SEPARATOR ', '), ", ", tariff_option.title) AS 'tariff'
FROM
    billing.contract
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
    LEFT JOIN contract_tariff_option
		ON contract_tariff_option.cid = contract.id
	LEFT JOIN tariff_option
		ON tariff_option.id = contract_tariff_option.option_id
WHERE
    LEFT(contract.title, 1) > 3
        AND param2.address NOT REGEXP 'ест|Նոր Արեշ 11, д. 91|'
        AND param2.address NOT LIKE ('')
        AND tariff_plan.id in (8,9,10,12,18,19,20,40,52,54,55,56,57,58,59,62)
GROUP BY scid