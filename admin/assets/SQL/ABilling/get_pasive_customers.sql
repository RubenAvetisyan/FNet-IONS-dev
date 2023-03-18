SELECT
    -- param1.val AS 'Client Name',
    concat(LEFT(contract.title,
        LOCATE('/', contract.title) - 1),",") AS 'title',
    contract.status_date,
    status.comment,
    status.date1 AS 'status date',
    param2.address,
    tariff_plan.title as 'tariff'
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
        -- LEFT JOIN
--     (SELECT 
--         cid, val
--     FROM
--         contract_parameter_type_1
--     WHERE
--         pid = 13) AS param1 ON param1.cid = contract.id
        LEFT JOIN
    contract_tariff ON contract_tariff.cid = contract.id
        LEFT JOIN
    tariff_plan ON tariff_plan.id = contract_tariff.tpid
WHERE
    LEFT(contract.title, 1) > 3
GROUP BY scid