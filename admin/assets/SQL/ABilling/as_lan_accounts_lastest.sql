USE billing;

-- Создание временной таблицы contract_table
DROP TEMPORARY TABLE IF EXISTS contract_table;
CREATE TEMPORARY TABLE IF NOT EXISTS contract_table
SELECT * FROM billing.contract
WHERE contract.scid <=0 AND 
contract.title NOT LIKE '3000%'
AND gr <> 128
AND comment NOT LIKE '%Речкалов%'
AND comment NOT LIKE '%Тест%'
AND comment NOT LIKE '%TEST%'
GROUP BY contract.id;

-- Создание временной таблицы CTO
DROP TEMPORARY TABLE IF EXISTS CTO;
CREATE TEMPORARY TABLE IF NOT EXISTS CTO
AS
SELECT
    cto.id,
    cto.time_from,
    cto.time_to,
    cto.cid,
    cto.option_id
FROM
    contract_tariff_option AS cto
    INNER JOIN (
        SELECT
            cid,
            MAX(activated_time) AS max_activated_time
        FROM
            contract_tariff_option
        WHERE
            deactivated_time IS NULL
        GROUP BY
            cid
    ) AS max_cto
    ON
        cto.cid = max_cto.cid
        AND cto.activated_time = max_cto.max_activated_time
        AND cto.deactivated_time IS NULL;
-- Создание индекса для временной таблицы CTO
ALTER TABLE CTO ADD INDEX idx_cto_cid (cid);

-- Создание временной таблицы PARAMS
DROP TEMPORARY TABLE IF EXISTS PARAMS;
CREATE TEMPORARY TABLE IF NOT EXISTS PARAMS
AS
SELECT DISTINCT
    contract_table.scid,
    PARAM_1.val as contractName,
    CAST(ah.house AS UNSIGNED) AS house,
    ah.frac,
    ah.comment,
    aa.title AS area,
    aq.title AS quarter,
    ast.title AS street,
    ac.title AS city,
    cpt2.flat,
    cpt2.room,
    cpt2.pod,
    cpt2.floor
FROM
    contract_table
    INNER JOIN billing.contract_parameter_type_2 cpt2 ON contract_table.id = cpt2.cid
    INNER JOIN billing.address_house ah ON cpt2.hid = ah.id
    INNER JOIN billing.address_quarter aq ON ah.quarterId = aq.id
    INNER JOIN billing.address_street ast ON ah.streetId = ast.id
    INNER JOIN billing.address_area aa ON ah.areaId = aa.id
    INNER JOIN billing.address_city ac ON aq.cityId = ac.id
    LEFT JOIN billing.contract_parameter_type_1 AS PARAM_1 ON PARAM_1.cid = contract_table.scid AND PARAM_1.pid = 13
WHERE
    aa.id IS NOT NULL
    AND ac.id IS NOT NULL;
-- Создание индекса для временной таблицы PARAMS
ALTER TABLE PARAMS ADD INDEX idx_params_scid (scid);

-- Создание временной таблицы CT
DROP TEMPORARY TABLE IF EXISTS CT;
CREATE TEMPORARY TABLE IF NOT EXISTS CT
AS
SELECT
    ct.cid,
    ct.tpid,
    tp.tree_id,
    ct.date1,
    ct.date2,
    tp.title,
    REPLACE(SUBSTRING_INDEX(SUBSTRING_INDEX(tp.config, 'cost=', -1), '\n', 1), ',', '') AS cost
FROM
    contract_tariff AS ct
    INNER JOIN tariff_plan AS tp ON ct.tpid = tp.id
WHERE
    (ct.date1 IS NULL OR ct.date1 <= CURDATE())
    AND (ct.date2 IS NULL OR ct.date2 >= CURDATE());
-- Создание индекса для временной таблицы CT
ALTER TABLE CT ADD INDEX idx_ct_cid (cid);

-- Создание временной таблицы BALANCE
CREATE TEMPORARY TABLE IF NOT EXISTS BALANCE
AS
SELECT
    cb.cid,
    (cb.summa1 + cb.summa2 - cb.summa3 - cb.summa4) AS balance,
    CONCAT(MAX(cb.yy), '-', MAX(cb.mm)) AS last_balance_date
FROM
    contract_balance cb
GROUP BY cb.cid;
-- Создание индекса для временной таблицы BALANCE
ALTER TABLE BALANCE ADD INDEX idx_balance_cid (cid);

-- Создание временной таблицы LAST_PAYMENT
DROP TEMPORARY TABLE IF EXISTS LAST_PAYMENT;
CREATE TEMPORARY TABLE IF NOT EXISTS LAST_PAYMENT
AS
SELECT 
    cp.cid,
    cp.dt,
    SUM(cp.summa) AS summa,
    cp.pt,
    cp.comment,
    cp.lm
FROM 
    contract_payment AS cp
INNER JOIN (
    SELECT 
        cid, 
        MAX(dt) AS latest_date
    FROM 
        contract_payment
    GROUP BY 
        cid
) AS subq
ON cp.cid = subq.cid AND cp.dt = subq.latest_date
GROUP BY 
    cp.cid, 
    cp.dt;
-- Создание индекса для временной таблицы LAST_PAYMENT
ALTER TABLE LAST_PAYMENT ADD INDEX idx_last_payment_cid (cid);

-- Создание временной таблицы MAIN
DROP TEMPORARY TABLE IF EXISTS MAIN;
CREATE TEMPORARY TABLE IF NOT EXISTS MAIN
SELECT DISTINCT
    concat(LEFT(contract_table.title, 7), ',') AS `Договор`,
    PARAMS.contractName as `Имя Контрагента`,
    contract_table.date1 as `Дата подключения`,
    contract_table.date2 as `Дата отключения`,
    COALESCE(CT.title, CTL.title) AS 'Тариф',
    COALESCE(CT.tpid, CTL.tree_id) AS 'tpid',
    IF(CTO.time_to > CURDATE(), tariff_option.title, '') AS `Скидка`,
    CASE WHEN LOCATE('%', tariff_option.title) > 0 AND (CTO.time_to IS NULL OR DATE(CTO.time_to) > NOW()) THEN CT.cost - tariff_option.title/100 * CT.cost
         WHEN LOCATE('-', tariff_option.title) > 0 THEN SUBSTRING_INDEX(SUBSTRING_INDEX(tariff_option.title, '-', -1), ' ', 1)
         WHEN CTL.title IS NOT NULL THEN REPLACE(SUBSTRING_INDEX(SUBSTRING_INDEX(CTL.config, 'cost=', -1), '\n', 1), ',', '')
         ELSE CT.cost
    END as `Рекомендуемая сумма`,
    COALESCE(CTO.time_from, '') as `Дата начала скидки`,
    IF(tariff_option.title LIKE '%обещанный%платеж%', ADDDATE(CTO.time_to, 5), COALESCE(CTO.time_to, '')) as `Дата окончания скидки`,
    COALESCE(cb.balance, 0) AS `Баланс`,
    COALESCE(CP.summa, 0) as `Сумма последнего платежа`,
    SUBSTRING_INDEX(SUBSTRING_INDEX(CG.title, '-', -1), ' ', -1) as `Дата платежа по тарифу`,
    COALESCE(CP.dt, 'платежи отсутствуют') as `Дата последнего платежа`,
    CASE
         WHEN contract_table.`status` = 0 THEN 'Ակտիվ'
         WHEN contract_table.`status` = 2 THEN 'Отключен'
         WHEN contract_table.`status` = 3 THEN 'Закрыт'
         WHEN contract_table.`status` = 4 THEN 'Снижен'
         WHEN contract_table.`status` = 5 THEN 'Закрыт'
         WHEN contract_table.`status` = 6 THEN 'Не подключен'
         WHEN contract_table.`status` = 7 THEN 'Վճարված չէ'
         ELSE NULL
    END as `Статус`,
    LEFT(CONCAT(contract_table.status_date, ''), 10) AS `Последняя дата блокировки`,
    PARAMS.city AS 'Город',
    PARAMS.area AS 'Район',
    PARAMS.quarter AS 'Квартал',
    PARAMS.street AS 'Улица',
    CONCAT(PARAMS.house, PARAMS.frac, ' ', PARAMS.comment) AS 'Дом',
    IF(ISNULL(PARAMS.flat), '', CONCAT('кв. ', PARAMS.flat)) as 'квартира',
    IF(ISNULL(PARAMS.room) OR LENGTH(PARAMS.room) = 0, '', CONCAT('комната ', PARAMS.room)) as 'комната',
    IF(ISNULL(PARAMS.pod) OR PARAMS.pod < 1 , '', CONCAT('под. ', PARAMS.pod)) as 'подъезд',
IF(ISNULL(PARAMS.floor) OR (PARAMS.flat >=0 AND PARAMS.floor < 1), '', CONCAT('эт. ', PARAMS.floor)) as 'этаж'
FROM
contract_table
LEFT JOIN contract_group AS CG ON contract_table.gr&(1<<CG.id) > 0
LEFT JOIN contract_tariff ON contract_tariff.cid = contract_table.id
LEFT JOIN CT ON CT.cid = contract_table.id
LEFT JOIN contract_tree_link AS CTL ON CTL.cid = contract_table.id
LEFT JOIN CTO ON CTO.cid = CT.cid
LEFT JOIN tariff_option ON tariff_option.id = COALESCE(CTO.option_id, CTL.cid)
INNER JOIN PARAMS ON PARAMS.scid = contract_table.id OR PARAMS.scid = contract_table.scid
LEFT JOIN BALANCE AS cb ON cb.cid = COALESCE(contract_table.scid, contract_table.id)
LEFT JOIN LAST_PAYMENT AS CP ON CP.cid = COALESCE(contract_table.scid, contract_table.id)
WHERE
		contract_table.title NOT LIKE '%CCTV%'
		AND PARAMS.contractName NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|Անուն|անուն|ազգանուն|Ազգանուն)'
GROUP BY contract_table.title, contract_table.status;

SELECT * FROM MAIN
LEFT JOIN tariff_group_tariff as TGT ON TGT.tpid = MAIN.tpid
WHERE MAIN.`Рекомендуемая сумма` IS NOT NULL
AND MAIN.`Статус` IS NOT NULL
-- AND TGT.tgid IN (2,6)
-- AND MAIN.`Статус` IN ('Վճարված չէ')
-- AND MAIN.`Город` LIKE 'Ախուրյան'
GROUP BY MAIN.`Договор`
ORDER BY MAIN.`Договор`;

-- Закрыть сессию
COMMIT;