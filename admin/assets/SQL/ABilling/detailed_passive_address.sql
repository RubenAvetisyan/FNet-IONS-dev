SELECT * FROM (SELECT DISTINCT
    LEFT(contract.title, 7) AS contractNumber,
    PARAMS.contractName as 'Контрагент',
    if(CT.title IS NULL, group_concat(DISTINCT CTL.title), group_concat(DISTINCT CT.title)) AS tariff,
		CASE WHEN locate('%', tariff_option.title) > 0 AND (CTO.time_to is null OR date(CTO.time_to) > now()) THEN CT.cost - tariff_option.title/100 * CT.cost
			 WHEN locate('-', tariff_option.title) > 0 THEN SUBSTRING_INDEX(SUBSTRING_INDEX(tariff_option.title, '-', -1), ' ', 1)
       WHEN CTL.title IS NOT NULL THEN REPLACE(SUBSTRING_INDEX(SUBSTRING_INDEX(CTL.config, 'cost=', -1), '\n', 1), ',', '')
			 ELSE CT.cost
		END as price,
		ifnull(cb.balance, 0) AS balance,
    SUBSTRING_INDEX(SUBSTRING_INDEX(CG.title, '-', -1), ' ', -1) as 'Дата платежа по тарфу',
    coalesce(CP.dt, 'платежи отсутствуют') as last_oay_dt,
		CASE
			WHEN contract.status = 0 THEN 'Ակտիվ'
			WHEN contract.status = 2 THEN 'անջատված'
			WHEN contract.status = 3 THEN 'փակ'
			WHEN contract.status = 4 THEN 'կասեցված'
			WHEN contract.status = 6 THEN 'միացված չէ'
			WHEN contract.status = 7 THEN 'վճարված չէ'
		END as status,
    concat(
			PARAMS.city, ', ',
			PARAMS.quarter, ', ',
			PARAMS.street, ', ',
			CONCAT(PARAMS.house, PARAMS.frac, ' ', PARAMS.comment),
			if(isnull(PARAMS.flat) OR length(PARAMS.flat) = 0, '', CONCAT(', բն.. ', PARAMS.flat)),
			if(isnull(PARAMS.room) OR length(PARAMS.room) = 0, '', CONCAT(', սենյակ ', PARAMS.room)),
			if(isnull(PARAMS.pod) OR PARAMS.pod < 1 , '', CONCAT(', մուտք. ', PARAMS.pod)),
			if(isnull(PARAMS.floor) OR (PARAMS.flat >=0 AND PARAMS.floor < 1), '', CONCAT(', հարկ. ', PARAMS.floor))
    ) as address
FROM
    billing.contract
    LEFT JOIN contract_group AS CG ON contract.gr&(1<<CG.id) > 0
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
		LEFT JOIN contract_tree_link AS CTL ON CTL.cid = contract.id
		LEFT JOIN (SELECT cto.id, cto.time_from, cto.time_to, cto.cid, cto.option_id
							FROM contract_tariff_option AS cto
							INNER JOIN (
								SELECT cid, MAX(activated_time) AS max_activated_time
								FROM contract_tariff_option
								GROUP BY cid
							) AS max_cto
							ON cto.cid = max_cto.cid 
							AND cto.deactivated_time is null
							) AS CTO ON CTO.cid = CT.cid
		LEFT JOIN tariff_option ON tariff_option.id = coalesce(CTO.option_id, CTL.cid)
    LEFT JOIN (
								SELECT 
										contract.scid,
                    param1.val as contractName,
										CAST(ah.house AS UNSIGNED) AS house,
										ah.frac,
										ah.comment,
										aq.title AS quarter,
										ast.title AS street,
										ac.title AS city,
                    cpt2.flat,
                    cpt2.room,
                    cpt2.pod,
                    cpt2.floor
								FROM
										billing.contract
										LEFT JOIN billing.contract_parameter_type_2 cpt2 ON contract.id = cpt2.cid
										LEFT JOIN billing.address_house ah ON cpt2.hid = ah.id
										LEFT JOIN billing.address_quarter aq ON ah.quarterId = aq.id
										LEFT JOIN billing.address_street ast ON ah.streetId = ast.id
										LEFT JOIN billing.address_area aa ON ah.areaId = aa.id
										LEFT JOIN billing.address_city ac ON aq.cityId = ac.id
                    LEFT JOIN billing.contract_parameter_type_1 AS param1 ON param1.cid = contract.scid AND param1.pid = 13
								WHERE
										ac.title LIKE '%city%'
                    AND aq.title LIKE '%quarter%'
										AND ast.title LIKE '%street%'
						) AS PARAMS ON PARAMS.scid = contract.id OR PARAMS.scid = contract.scid
    LEFT JOIN (
								SELECT cb.cid, (cb.summa1 + cb.summa2 - cb.summa3 - cb.summa4) AS balance, CONCAT(MAX(cb.yy), '-', MAX(cb.mm)) AS last_balance_date
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
    contract.title NOT LIKE '%CCTV%'
		AND PARAMS.contractName NOT like '%Андрей Речкалов%'
    AND PARAMS.contractName NOT like '%Речкалов Андрей%'
    AND contract.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|Անուն|անուն|ազգանուն|Ազգանուն)'
    AND contract.status <> 0 AND contract.status <> 6
group by contract.id, contract.status) AS MAIN
WHERE MAIN.price IS NOT NULL
GROUP BY MAIN.contractNumber
ORDER BY MAIN.contractNumber;