SELECT 
	MAIN.contractNumber as 'Պայ\nմանա\nգիր №', 
  MAIN.Контрагент as 'Անուն\n Ազգանուն',
  group_concat(DISTINCT MAIN.tariff) as 'Սակա\nգին',
  concat(Date(MAIN.connection_date), '') as 'Միացման ա/թ',
  group_concat(DISTINCT MAIN.price) as 'Սակա\nգին\n գումար',
  MAIN.balance as 'Հաշ\nվե\nկշիռ', 
  MAIN.pay_dt_by_tariff as 'վերջին\nՎճարման օր', 
  MAIN.last_pay_dt as 'վերջին\nՎճարման ա/թ',
  MAIN.summa as 'Փաս\nտացի\nվճար\nված\nգու\nմար',
  CASE
		WHEN find_in_set(group_concat(MAIN.status), 'վճարված չէ') > 0 THEN 'Պասիվ'
    WHEN find_in_set(group_concat(MAIN.status), 'Ակտիվ') > 0 AND find_in_set(group_concat(MAIN.status), 'վճարված չէ') = 0 THEN 'Ակտիվ'
    ELSE MAIN.status
  END as 'Կար\nգա\nվի\ճակ',
  MAIN.address as 'Հասցե'
FROM (SELECT DISTINCT
		c.date1 as connection_date,
    LEFT(contract.title, 7) AS contractNumber,
    PARAMS.contractName as 'Контрагент',
    if(contract.status = 3, null, ifnull(CTL.title, CT.title)) AS tariff,
		CASE WHEN locate('%', tariff_option.title) > 0 AND (CTO.time_to is null OR date(CTO.time_to) > now()) THEN CT.cost - tariff_option.title/100 * CT.cost
			 WHEN locate('-', tariff_option.title) > 0 THEN SUBSTRING_INDEX(SUBSTRING_INDEX(tariff_option.title, '-', -1), ' ', 1)
       WHEN CTL.title IS NOT NULL THEN REPLACE(SUBSTRING_INDEX(SUBSTRING_INDEX(CTL.config, 'cost=', -1), '\n', 1), ',', '')
			 ELSE CT.cost
		END as price,
		ifnull(cb.balance, 0) AS balance,
    SUBSTRING_INDEX(SUBSTRING_INDEX(CG.title, '-', -1), ' ', -1) as pay_dt_by_tariff,
    coalesce(CP.dt, 'платежи отсутствуют') as last_pay_dt,
    CP.summa as summa,
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
			PARAMS.street, ' ',
			trim(CONCAT(PARAMS.house, PARAMS.frac, ' ', PARAMS.comment)),
			if(isnull(PARAMS.flat) OR length(PARAMS.flat) = 0, '', CONCAT(', բն.. ', PARAMS.flat)),
			if(isnull(PARAMS.room) OR length(PARAMS.room) = 0, '', CONCAT(', սենյակ ', PARAMS.room)),
			if(isnull(PARAMS.pod) OR PARAMS.pod < 1 , '', CONCAT(', մուտք. ', PARAMS.pod)),
			if(isnull(PARAMS.floor) OR (PARAMS.flat >=0 AND PARAMS.floor < 1), '', CONCAT(', հարկ. ', PARAMS.floor))
    ) as address
FROM
    billing.contract
    LEFT JOIN (select LEFT(contract.title, 7) as title, max(contract.date1) as date1 from contract group by LEFT(contract.title, 7)) as c ON LEFT(c.title, 7) = LEFT(contract.title, 7)
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
    INNER JOIN (
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
										INNER JOIN billing.contract_parameter_type_2 cpt2 ON contract.id = cpt2.cid
										INNER JOIN billing.address_house ah ON cpt2.hid = ah.id
										INNER JOIN billing.address_quarter aq ON ah.quarterId = aq.id
										INNER JOIN billing.address_street ast ON ah.streetId = ast.id
										INNER JOIN billing.address_area aa ON ah.areaId = aa.id
										INNER JOIN billing.address_city ac ON aq.cityId = ac.id
                    LEFT JOIN billing.contract_parameter_type_1 AS param1 ON param1.cid = contract.scid AND param1.pid = 13
						) AS PARAMS ON PARAMS.scid = contract.id OR PARAMS.scid = contract.scid
    LEFT JOIN (
								SELECT cb.cid, (cb.summa1 + cb.summa2 - cb.summa3 - cb.summa4) AS balance, CONCAT(MAX(cb.yy), '-', MAX(cb.mm)) AS last_balance_date
								FROM contract_balance cb
								GROUP BY cb.cid
						) AS cb ON cb.cid = coalesce(contract.scid, contract.id)
		LEFT JOIN (
				SELECT MAIN.contractNumber as contractNumber, sum(MAIN.summa) as summa, max(MAIN.dt) as dt FROM (SELECT 
				LEFT(contract.title, 7) as contractNumber,
				contract_payment.summa,
				contract_payment.dt as dt
				FROM billing.contract_payment
				LEFT JOIN contract ON contract.id = contract_payment.cid
				LEFT JOIN contract_payment_types AS PT ON PT.id = contract_payment.pt
				WHERE contract_payment.dt LIKE CONCAT(DATE_FORMAT(NOW(), '%Y-%m'), '%')
				AND PT.id <> 9 AND PT.up <> 9
				GROUP BY contract_payment.comment) AS MAIN
				GROUP BY MAIN.contractNumber
		) AS CP ON CP.contractNumber = LEFT(contract.title, 7)
WHERE
		contract.title IN (contractNumbers)
group by contract.title, contract.status) AS MAIN
WHERE MAIN.price IS NOT NULL
GROUP BY MAIN.contractNumber
ORDER BY MAIN.contractNumber;