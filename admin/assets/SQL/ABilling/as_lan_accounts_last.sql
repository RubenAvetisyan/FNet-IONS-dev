SELECT DISTINCT
    contract.title AS `Договор`,
		contract.date1 as `Дата подключения`,
    contract.date2 as `Дата отключения`,
    CT.title AS 'Тариф',
    if(CTO.time_to > curdate(), tariff_option.title, '') AS `Скидка`,
		CASE WHEN locate('%', tariff_option.title) > 0 AND (CTO.time_to is null OR date(CTO.time_to) > now()) THEN CT.cost - tariff_option.title/100 * CT.cost
			 WHEN locate('-', tariff_option.title) > 0 THEN SUBSTRING_INDEX(SUBSTRING_INDEX(tariff_option.title, '-', -1), ' ', 1)
			 ELSE CT.cost
		END as `конечная цена`,
    coalesce(CTO.time_from, '') as `Дата начала скидки`,
    if(tariff_option.title like '%обещанный%платеж%', adddate(CTO.time_to, 5), coalesce(CTO.time_to, '')) as `Дата окончания скидки`,
		cb.balance AS `Баланс`,
    coalesce(sum(CP.summa), 0) as `Сумма последнего платежа`,
    coalesce(CP.dt, 'платежи отсутствуют') as `Дата последнего платежа`,
		CASE
				 WHEN contract.`status` = 0 THEN 'Ակտիվ'
				 WHEN contract.`status` = 2 THEN 'անջատված'
				 WHEN contract.`status` = 3 THEN 'փակ'
				 WHEN contract.`status` = 4 THEN 'կասեցված'
				 WHEN contract.`status` = 6 THEN 'միացված չէ'
				 WHEN contract.`status` = 7 THEN 'չվճարված'
			END as `Статус`,
		LEFT(CONCAT(contract.status_date, ''), 10) AS `Последняя Дата Блокировки`,
    PARAMS.city AS 'Город',
		PARAMS.area AS 'Район',
		PARAMS.quarter AS 'Квартал',
		PARAMS.street AS 'Улица',
		CONCAT(PARAMS.house, PARAMS.frac, ' ', PARAMS.comment) AS 'Дом',
		if(isnull(PARAMS.flat), '', CONCAT('кв. ', PARAMS.flat)) as 'квартира',
		if(isnull(PARAMS.room) OR length(PARAMS.room) = 0, '', CONCAT('комната ', PARAMS.room)) as 'комната',
		if(isnull(PARAMS.pod) OR PARAMS.pod < 1 , '', CONCAT('под. ', PARAMS.pod)) as 'подъезд',
		if(isnull(PARAMS.floor) OR (PARAMS.flat >=0 AND PARAMS.floor < 1), '', CONCAT('эт. ', PARAMS.floor)) as 'этаж'
FROM
    billing.contract
		LEFT JOIN contract_tariff ON contract_tariff.cid = contract.id
    LEFT JOIN (SELECT 
										ct.cid,
										ct.tpid,
										tp.tree_id,
										ct.date1,
										ct.date2,
										tp.title,
										REPLACE(SUBSTRING_INDEX(SUBSTRING_INDEX(tp.config, 'cost=', -1), '\n', 1), ',', '') AS cost
								FROM
										(SELECT *
										 FROM contract_tariff
										 WHERE (date1 IS NULL OR date1 <= CURDATE())
											 AND (date2 IS NULL OR date2 >= CURDATE())) AS ct
								INNER JOIN tariff_plan AS tp ON ct.tpid = tp.id
							) as CT ON CT.cid = contract.id
		LEFT JOIN (SELECT cto.id, cto.time_from, cto.time_to, cto.cid, cto.option_id
							FROM contract_tariff_option AS cto
							INNER JOIN (
								SELECT cid, MAX(activated_time) AS max_activated_time
								FROM contract_tariff_option
								GROUP BY cid
							) AS max_cto
							ON cto.cid = max_cto.cid 
							AND cto.activated_time = max_cto.max_activated_time 
							AND cto.deactivated_time is null
							) AS CTO ON CTO.cid = CT.cid
		LEFT JOIN tariff_option ON tariff_option.id = CTO.option_id
    INNER JOIN (
								SELECT 
										c.scid,
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
										billing.contract c
										INNER JOIN billing.contract_parameter_type_2 cpt2 ON c.id = cpt2.cid
										INNER JOIN billing.address_house ah ON cpt2.hid = ah.id
										INNER JOIN billing.address_quarter aq ON ah.quarterId = aq.id
										INNER JOIN billing.address_street ast ON ah.streetId = ast.id
										INNER JOIN billing.address_area aa ON ah.areaId = aa.id
										INNER JOIN billing.address_city ac ON aq.cityId = ac.id
								WHERE
										ast.title LIKE '%Երկաթուղայիններ%'
						) AS PARAMS ON PARAMS.scid = contract.id OR PARAMS.scid = contract.scid
    LEFT JOIN (
								SELECT cb.cid, (cb.summa1 + cb.summa2 - cb.summa3 + cb.summa4) AS balance, CONCAT(MAX(cb.yy), '-', MAX(cb.mm)) AS last_balance_date
								FROM contract_balance cb
								GROUP BY cb.cid
						) AS cb ON cb.cid = coalesce(contract.scid, contract.id)
		LEFT JOIN (
				SELECT 
						cp1.cid, 
						cp1.dt, 
						cp1.summa, 
						cp1.pt, 
						cp1.comment
				FROM 
						contract_payment cp1
				LEFT JOIN 
						contract_payment cp2 
				ON 
						cp1.cid = cp2.cid AND cp1.dt < cp2.dt
				WHERE 
						cp2.cid IS NULL
		) AS CP ON CP.cid = COALESCE(contract.scid, contract.id)
WHERE
    LEFT(contract.title, 1) <> 3
		-- AND contract.title like '%9001505%'
		AND contract.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|թեստ|Թեստ|բաժանորդ|TEST|Անուն|Ազգանուն)'
group by contract.title, contract.`status`
ORDER BY contract.scid DESC, contract.id DESC;