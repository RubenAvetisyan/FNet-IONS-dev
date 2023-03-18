SELECT
    ct.comment AS `Name`,
    if(length(ct.title)> 7, group_concat(ct.title),ct.title) AS Contract_ID,
    null as Phone_numbers,
    concat(t1.`city`, ", ",
    t1.`area`, ", ",
    t1.`quarter`, ", ",
    t1.`street`, ", ",
    t1.`house`) as address,
    ct.date1 as addr_date,
    -- cp.id AS Transaction_ID,
    cb.balance AS Balance,
    cb.balance_date AS Balance_Date,
    t1.tariff,
    cp.summa AS payment_sum,
    cp.dt AS pay_date,
    null as marz_group,
    -- IF(PT.up > 0, (
--         SELECT pt.title FROM billing.contract_payment_types AS pt WHERE pt.id = PT.up
--     ), PT.title) AS `P_TYPE`,
    if(left(SUBSTRING(cp.comment, LOCATE('#', cp.comment) + 1), 1) = ' ', SUBSTRING(cp.comment, LOCATE('#', cp.comment) + 2), SUBSTRING(cp.comment, LOCATE('#', cp.comment) + 1)) AS transaction_code,
    PT.title AS P_SYSTEM
    -- t1.`Contract`,
    -- t1.`blockDate`,    
FROM
    billing.contract AS ct
    INNER JOIN billing.contract_payment AS cp ON ct.id = cp.cid
    INNER JOIN billing.contract_payment_types AS PT ON PT.id = cp.pt
    LEFT JOIN (
        SELECT cid,
               SUM(summa1 + summa2) - SUM(summa3 + summa4) AS `balance`,
               IF(LAST_DAY(CONCAT(yy, '-', mm, '-1')) > NOW(), NOW(), LAST_DAY(CONCAT(yy, '-', mm, '-1'))) AS `balance_date`
        FROM contract_balance
        GROUP BY cid
    ) AS cb ON cb.cid = ct.id
    LEFT JOIN (
        SELECT
            c.contract AS `Contract`,
            LEFT(CONCAT(c.status_date, ''), 10) AS `blockDate`,
            ac.title AS `city`,
            aa.title AS `area`,
            aq.title AS `quarter`,
            as1.title AS `street`,
            CONCAT_WS(' ', h.house, h.frac, h.comment) AS `house`,
            CONCAT_WS(', ', GROUP_CONCAT(tp.title), to1.title) AS `tariff`
        FROM
            (SELECT
                id,
                LEFT(title, LOCATE('/', title) - 1) AS `contract`,
                status_date
             FROM billing.contract
             WHERE LEFT(title, 1) > '3') c
        LEFT JOIN contract_parameter_type_2 p2 ON p2.cid = c.id
        LEFT JOIN address_house h ON p2.hid = h.id
        LEFT JOIN address_area aa ON h.areaid = aa.id
        LEFT JOIN address_quarter aq ON h.quarterid = aq.id
        LEFT JOIN address_street as1 ON h.streetid = as1.id
        LEFT JOIN address_city ac ON as1.cityid = ac.id
        LEFT JOIN contract_tariff ct ON ct.cid = c.id
        LEFT JOIN tariff_plan tp ON tp.id = ct.tpid
        LEFT JOIN contract_tariff_option cto ON cto.cid = c.id
        LEFT JOIN tariff_option to1 ON to1.id = cto.option_id
        WHERE
            p2.address NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|Անուն|Ազգանուն|անուն|ազգանուն)'
        GROUP BY
            c.id
    ) AS t1 ON t1.`Contract` = ct.title
WHERE
    ct.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|նուն|ազգանուն)'
    -- AND length(ct.comment) > 0
    AND ct.title <> 9000019
    AND cp.dt >= '2023-01-01'
    AND cp.dt <= '2023-01-31 23:59:59'
group by ct.title
ORDER BY
    cp.dt DESC;