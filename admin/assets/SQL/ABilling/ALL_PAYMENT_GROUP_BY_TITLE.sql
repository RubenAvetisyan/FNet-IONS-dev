SELECT MAIN.contractNumber as contractNumber, contractName, sum(MAIN.summa) as summa, count(MAIN.summa) as count FROM (SELECT 
contract.id,
LEFT(contract.title, 7) as contractNumber,
PARAM1.val as contractName,
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
LEFT JOIN contract_parameter_type_1 as PARAM1 ON PARAM1.cid = contract_payment.cid ANd PARAM1.pid = 13
WHERE contract_payment.dt >= '2023-03-01' AND contract_payment.dt <= '2023-03-31'
AND PT.id <> 9 AND PT.up <> 9
GROUP BY comment) AS MAIN
GROUP BY MAIN.contractNumber