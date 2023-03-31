SELECT MAIN.area, sum(MAIN.summa) FROM (SELECT 
TRIM(mid(PARAM2.address,
 locate(',', PARAM2.address, locate(',', PARAM2.address, 4) +4)+2, locate(',',PARAM2.address,locate(',', PARAM2.address, locate(',', PARAM2.address, 4) +4)+4)
 - locate(',', PARAM2.address, locate(',', PARAM2.address, 4) +4)-2)) as `area`,
 t1.*
FROM (SELECT 
contract.id,
contract.title,
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
WHERE contract_payment.dt >= '2023-03-01'
AND PT.id <> 9 AND PT.up <> 9
AND contract.title NOT LIKE '3000%'
-- AND PT.id NOT IN (11,12,13,14,4)
) AS t1
LEFT JOIN (SELECT contract.scid, param2.hid, param2.address FROM contract INNER JOIN contract_parameter_type_2 AS param2 ON param2.cid = contract.id) as PARAM2
ON PARAM2.scid = t1.id
GROUP BY t1.comment) as MAIN
GROUP BY MAIN.area
ORDER BY MAIN.title