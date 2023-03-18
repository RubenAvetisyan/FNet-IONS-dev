SELECT
		if(CTO.time_to > curdate(), tariff_option.title, null) AS `Скидка`,
		CASE WHEN locate('%', tariff_option.title) > 0 AND (CTO.time_to is null OR date(CTO.time_to) > now()) THEN CT.cost - tariff_option.title/100 * CT.cost
			 WHEN locate('-', tariff_option.title) > 0 THEN SUBSTRING_INDEX(SUBSTRING_INDEX(tariff_option.title, '-', -1), ' ', 1)
			 ELSE CT.cost
		END as `price`,
    CTO.time_from as `Дата начала скидки`,
    CTO.time_to as `Дата окончания скидки`,
    if(contract.scid > 0, left((select c.title from contract as c where c.id = contract.scid), 7), left(contract.title, 7)) AS `Договор`,
		if((cb.summa1 + cb.summa2) - (cb.summa3 + cb.summa4) is null , 0, (cb.summa1 + cb.summa2) - (cb.summa3 + cb.summa4)) AS `Баланс`,
		contract.date1 as `Дата подключения`,
    contract.date2 as `Дата отключения`,
    if(CP.summa is null, 0, CP.summa) as `Сумма последнего платежа`,
    CP.dt as `Дата последнего платежа`,
		CASE 
				 WHEN contract.status = 0 THEN 'Ակտիվ'
				 WHEN contract.status = 2 THEN 'անջատված'
				 WHEN contract.status = 3 THEN 'փակ'
				 WHEN contract.status = 4 THEN 'կասեցված'
				 WHEN contract.status = 6 THEN 'միացված չէ'
				 WHEN contract.status = 7 THEN 'չի վճարում'
			END as `Статус`,
		LEFT(CONCAT(contract.status_date, ''), 10) AS `Последняя Дата Блокировки`,
    city.title AS `Город`,
    area.title AS `Район`,
    quarter.title AS `Квартал`,
    street.title AS `Улица`,
    CONCAT(house.house,
            house.frac,
            ' ',
            house.comment) AS `Дом`,
    CT.title AS 'Тариф'
FROM
    billing.contract
		JOIN (SELECT 
							t1.*
					FROM
							contract_status t1
							JOIN (SELECT 
									cid, MAX(date1) AS max_date
							FROM
									contract_status
							GROUP BY cid) t2 ON t1.cid = t2.cid AND t1.date1 = t2.max_date
					WHERE
							t2.max_date <= NOW()
        ) AS status ON status.cid = contract.id
		LEFT JOIN contract_parameter_type_2 AS param2 ON param2.cid = contract.id
		LEFT JOIN contract_tariff ON contract_tariff.cid = contract.id
    LEFT JOIN (SELECT
									contract_tariff.cid,
									contract_tariff.tpid,
									tariff_plan.tree_id,
									contract_tariff.date1,
									contract_tariff.date2,
									tariff_plan.title, 
									SUBSTRING_INDEX(trim(SUBSTRING_INDEX(SUBSTRING_INDEX(tariff_plan.config, 'cost=', -1), ' ', 1)), '\n', 1) AS cost
							FROM
									contract_tariff
									LEFT JOIN tariff_plan ON tariff_plan.id = contract_tariff.tpid
							WHERE
									(contract_tariff.date1 IS NULL OR contract_tariff.date1 <= CURDATE())
									AND (contract_tariff.date2 IS NULL OR contract_tariff.date2 >= CURDATE())
							) as CT ON CT.cid = contract.id
		LEFT JOIN (SELECT
							cto.id,
							cto.time_from,
							cto.time_to,
							cto.cid,
							cto.option_id
							FROM contract_tariff_option AS cto
							INNER JOIN (
							SELECT cid, MAX(activated_time) AS max_activated_time
							FROM contract_tariff_option
							GROUP BY cid
							) AS max_cto
							ON cto.cid = max_cto.cid AND cto.activated_time = max_cto.max_activated_time AND cto.deactivated_time is null
							) AS CTO ON CTO.cid = CT.cid
		LEFT JOIN tariff_option ON tariff_option.id = CTO.option_id
		LEFT JOIN address_house AS house ON param2.hid = house.id
		LEFT JOIN address_area AS area ON house.areaid = area.id
		LEFT JOIN address_quarter AS quarter ON house.quarterid = quarter.id
		LEFT JOIN address_street AS street ON house.streetid = street.id
		LEFT JOIN address_city AS city ON street.cityid = city.id
    LEFT JOIN (
			SELECT bal.cid, bal.summa1, bal.summa2, bal.summa3, bal.summa4, bal.mm, bal.yy 
			FROM (
				SELECT cid, MAX(yy*12+(mm-1))%12 + 1 AS mm, FLOOR(MAX(yy*12+(mm-1)) / 12) AS yy 
				FROM contract_balance 
				GROUP BY cid
			) AS max_date
			JOIN contract_balance AS bal 
			ON bal.cid = max_date.cid AND bal.mm = max_date.mm AND bal.yy = max_date.yy
		) AS cb ON cb.cid = COALESCE(contract.scid, contract.id)
		LEFT JOIN (SELECT CPMax.cid, CPMax.dt, cp.summa, cp.pt, cp.comment
						FROM (select cid, max(contract_payment.dt) as dt
							 from contract_payment
							 group by cid
							) as CPMax
						inner join contract_payment AS cp 
						ON cp.cid = CPMax.cid AND cp.dt = CPMax.dt
		) as CP on CP.cid = COALESCE(contract.scid, contract.id)
WHERE
    LEFT(contract.title, 1) > 3
		-- AND contract.title = 7036272
		AND param2.address NOT LIKE ('%ест%')
		AND param2.address NOT LIKE ('%Նոր Արեշ 11, д. 91%')
		AND contract.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|Անուն|անուն|ազգանուն|Ազգանուն)'
GROUP BY contract.scid