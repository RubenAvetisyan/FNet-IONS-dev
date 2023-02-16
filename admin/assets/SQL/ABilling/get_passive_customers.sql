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
    tariff_plan.title AS 'tariff'
FROM
    billing.contract
        JOIN
    (SELECT 
        t1.*
    FROM
        contract_status t1
    JOIN (SELECT 
        cid, MAX(date1) AS max_date
    FROM
        contract_status
    GROUP BY cid) t2 ON t1.cid = t2.cid
        AND t1.date1 = t2.max_date
    WHERE
        t1.status = 7 AND t2.max_date <= NOW()) AS status ON status.cid = contract.id
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
GROUP BY scid