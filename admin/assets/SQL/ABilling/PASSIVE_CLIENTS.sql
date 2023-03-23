SELECT DISTINCT
    LEFT(contract.title, 7) as contractNumber, PARAM1.val as clientName
FROM
    contract
        INNER JOIN
    (SELECT 
        title
    FROM
        (SELECT DISTINCT
        contract.title, t1.id
    FROM
        contract
    LEFT JOIN (SELECT DISTINCT
        LEFT(contract.title, 7) AS id
    FROM
        billing.contract
    WHERE
        status = 0 AND title_pattern_id = 0
            AND contract.title NOT LIKE '300%') AS t1 ON contract.title = t1.id
    WHERE
        LENGTH(contract.title) = 7) AS MAIN
    WHERE
        MAIN.id IS NULL) AS t2 ON t2.title = LEFT(contract.title, 7)
        INNER JOIN
    contract_parameter_type_1 AS PARAM1 ON PARAM1.cid = contract.id
        AND PARAM1.pid = 13
WHERE
    contract.status NOT IN (3 , 6)
        AND PARAM1.val NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|թեստ|Թեստ|բաժանորդ|TEST|Անուն|Ազգանուն)'