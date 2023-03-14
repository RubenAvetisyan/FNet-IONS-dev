SELECT `contract`, `balance`, `tariff`, `Discount`, `totalCostTariff`, `discountEndDate`, `dayOfPayment`, `status` 
FROM (SELECT
	if(CTO.time_to > curdate(), tariff_option.title, null) AS `Discount`,
	if(CTO.time_to > curdate(), CTO.time_from, null) AS `Discount_Start_Date`,
	if(CTO.time_to > curdate(), CTO.time_to, null) AS `discountEndDate`,
  LEFT(contract.title, 7) AS `contract`,
  param1.val AS `customerName`,
	CB.summa AS `balance`,
	contract.date1 AS `Activation_Date`,
	contract.date2 AS `Deactivation_Date`,
	CP.summa AS `Last_Payment_Amount`,
	CP.last_payment_date AS `Last_Payment_Date`,
  SUBSTRING_INDEX(SUBSTRING_INDEX(CG.title, '-', -1), ' ', -1) as `dayOfPayment`,
  day(current_date()),
	CASE 
		WHEN contract.status = 0 THEN 'Active'
		WHEN contract.status = 2 THEN 'Inactive'
		WHEN contract.status = 3 THEN 'Closed'
		WHEN contract.status = 4 THEN 'Suspended'
		WHEN contract.status = 6 THEN 'Not Connected'
		WHEN contract.status = 7 THEN 'Not Paying'
	END AS `status`,
  count(LEFT(contract.title, 7)) as count,
	LEFT(CONCAT(contract.status_date, ''), 10) AS `Last_Blocked_Date`,
	ac.title AS `City`,
	ar.title AS `District`,
	aq.title AS `Quarter`,
	ast.title AS `Street`,
	concat('տ. ', ah.house, ' ', param2.flat)AS `House`,
	CT.title AS `tariff`,
  CASE WHEN locate('%', tariff_option.title) > 0 AND (CTO.time_to is null OR date(CTO.time_to) > now()) THEN CT.cost - tariff_option.title/100 * CT.cost
			 WHEN locate('-', tariff_option.title) > 0 THEN SUBSTRING_INDEX(SUBSTRING_INDEX(tariff_option.title, '-', -1), ' ', 1)
			 ELSE CT.cost
  END as `totalCostTariff`
FROM contract
LEFT JOIN contract_group AS CG ON CG.id = CASE WHEN day(current_date()) < 11 THEN 1 
											WHEN  day(current_date()) < 16 and day(current_date()) > 11 THEN 2 
											WHEN day(current_date()) >= 21 THEN 3 
											END
LEFT JOIN contract_parameter_type_1 as param1 ON param1.cid = contract.scid AND param1.pid = 13
INNER JOIN contract_parameter_type_2 AS param2 ON contract.id = param2.cid
INNER JOIN address_house AS ah ON param2.hid = ah.id
INNER JOIN address_street AS ast ON ah.streetid = ast.id
INNER JOIN address_city AS ac ON ast.cityid = ac.id
INNER JOIN address_area as ar ON ac.id = ar.cityid
INNER JOIN address_quarter as aq ON ac.id = aq.cityid AND ah.quarterid = aq.id
LEFT JOIN (
		SELECT
		balance.cid,
		balance.mm,
		balance.yy,
		balance.summa1 + balance.summa2 - balance.summa3 - balance.summa4 AS summa
		FROM
		contract_balance AS balance
		INNER JOIN (
			SELECT
			cid,
			MAX(yy * 12 + (mm - 1)) % 12 + 1 AS mm,
			FLOOR(MAX(yy * 12 + (mm - 1)) / 12) AS yy
			FROM
			contract_balance
			GROUP BY cid
		) AS dump ON dump.cid = balance.cid AND balance.yy = dump.yy AND balance.mm = dump.mm
	) AS CB ON CB.cid = contract.scid
LEFT JOIN (
	SELECT 
    payment.cid,
    payment.summa,
    payment.dt AS last_payment_date
FROM
    contract_payment AS payment
        INNER JOIN
    (SELECT 
        cid, MAX(summa) AS `Max_Sum`, MAX(dt) AS `Last_Payment_Date`
    FROM
        contract_payment
    GROUP BY cid) AS cp ON payment.cid = cp.cid
        AND payment.summa = cp.`Max_Sum`
        AND payment.dt = cp.`Last_Payment_Date`
) AS CP ON CP.cid = contract.scid
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
LEFT JOIN (
	SELECT
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
LEFT JOIN (SELECT c.id,c.title,c.comment, COALESCE(
																										REPLACE(REPLACE(DATA,'cost&',''),'%type&1',''),
                                                    p.title
																									)AS abon
					FROM contract c
					LEFT JOIN contract_balance b ON c.id=b.cid
					LEFT JOIN contract_tariff AS t ON c.id=t.cid AND t.date2 IS NULL
					LEFT JOIN tariff_plan AS p ON t.tpid=p.id
					LEFT JOIN tariff_tree ON tariff_tree.id=t.tpid
					LEFT JOIN module_tariff_tree ON module_tariff_tree.tree_id=tariff_tree.id
					LEFT JOIN mtree_node ON mtree_node.mtree_id=module_tariff_tree.id 
					WHERE b.yy=YEAR(NOW()) AND (mtree_node.type='day_cost')
					GROUP BY c.id
					) as TCost ON TCost.id = contract.id
WHERE LEFT(contract.title, 1) > 3
	AND contract.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|Անուն|անուն|ազգանուն|Ազգանուն)'
  AND contract.status = 0
  AND contract.del = 0
  AND length(contract.title) > 7
  AND contract.gr&(1<<CASE WHEN day(current_date()) < 11 THEN 1 
											WHEN  day(current_date()) < 16 and day(current_date()) > 11 THEN 2 
											WHEN day(current_date()) >= 21 THEN 3 
											END
									) > 0
group by contract.id) as MAIN
WHERE MAIN.`Balance` < MAIN.`totalCostTariff`