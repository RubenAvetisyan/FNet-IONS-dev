SELECT count(PRIME.contractNumber) as count, sum(PRIME.summa) as summa, sum(PRIME.count) as paymentCount FROM (SELECT MAIN.contractNumber, sum(MAIN.summa) as summa, count(MAIN.summa) as count FROM (
SELECT 
contract.id,
LEFT(contract.title, 7) as contractNumber,
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
WHERE contract_payment.dt >= '2022-01-01' AND contract_payment.dt <= current_date()
AND PT.id <> 9 AND PT.up <> 9
AND LEFT(contract.title, 7) NOT LIKE '3000%' 
AND contract.title in (contractNumbers)
GROUP BY comment
) AS MAIN

GROUP BY MAIN.contractNumber
) AS PRIME