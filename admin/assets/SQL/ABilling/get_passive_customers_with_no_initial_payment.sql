SELECT 
	contract.id as 'cid',
    LEFT(contract.title,
        LOCATE('/', contract.title) - 1) AS 'contract',
	contract.date1 as 'connection date',
    left(concat(contract.status_date, ''), 10) as 'blockDate',
    param2.address as 'address',
    tariff_plan.title AS 'tariff',
    lastPayment.summa as 'lastPayment'
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
    tariff_plan ON tariff_plan.id = contract_tariff.tpid
    left join (SELECT 
        t1.*
    FROM
        contract_payment t1
    JOIN (SELECT 
        cid, MAX(lm) AS max_date, summa
    FROM
        contract_payment
    GROUP BY cid) t2 
    ON t1.cid = t2.cid AND t1.lm = t2.max_date) as lastPayment
    on lastPayment.cid = contract.id
WHERE contract.title like('9%')
    and param2.address not like('%Նոր Արեշ 11, д. 91%')
    and param2.address not like('%Тестовый%')
GROUP BY scid