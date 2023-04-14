SELECT MAIN.contractNumber as contractNumber, sum(MAIN.summa) as `summa` FROM (SELECT 
contract.id,
contract.title as contractNumber,
contract_payment.id as payment_id, 
contract_payment.cid,
contract_payment.uid as user_id,
contract_payment.summa,
contract_payment.`comment`,
contract_payment.lm as `datetime`,
PT.title as `payment_type`,
IF(PT.up > 0, (SELECT pt.title FROM contract_payment_types as pt WHERE PT.up = pt.id), '') as payment_group,
user.`name` as user_name
FROM billing.contract_payment
LEFT JOIN contract ON contract.id = contract_payment.cid
LEFT JOIN contract_payment_types AS PT ON PT.id = contract_payment.pt
LEFT JOIN user ON user.id = contract_payment.uid
INNER JOIN (SELECT LEFT(contract.title, 7) as contractNumber, TP.title as TARIFF FROM billing.contract_tariff as CT
LEFT JOIN contract ON contract.id = CT.cid
LEFT JOIN tariff_plan as TP On TP.id = CT.tpid
WHERE TP.title LIKE '%B2B%'
AND contract.title NOT LIKE '3000%'
UNION ALL
SELECT LEFT(contract.title, 7) as contractNumber, CT.title as TARIFF FROM billing.contract_tree_link as CT
LEFT JOIN contract ON contract.id = CT.cid
WHERE contract.title NOT LIKE '3000%'
AND CT.title LIKE '%B2B%') AS TARIFFS ON TARIFFS.contractNumber = contract.title
WHERE contract_payment.dt >= DATE_FORMAT(NOW(), '%Y-%m-01')
AND PT.id <> 9 AND PT.up <> 9
AND contract.title NOT LIKE '3000%' GROUP BY contract_payment.comment) AS MAIN
GROUP BY MAIN.contractNumber