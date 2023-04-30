SELECT PARAM1.cid, PARAM1.val as ip, PARAM1_PON.val as PON, PARAM1_AIM.val as AIM, PARAM1_SERIAL.val as `serial`, LEFT(contract.title, 7) AS `Պայմանագիր №`, MID(PARAM2.address, 3, 1000) as `Հասցե` FROM contract_parameter_type_1 AS PARAM1
INNER JOIN contract ON contract.id = PARAM1.cid
LEFT JOIN contract_parameter_type_1 AS PARAM1_PON ON PARAM1_PON.pid = 14 AND PARAM1_PON.cid = contract.id
LEFT JOIN contract_parameter_type_1 AS PARAM1_AIM ON PARAM1_AIM.pid = 15 AND PARAM1_AIM.cid = contract.id
Inner JOIN contract_parameter_type_1 AS PARAM1_SERIAL ON PARAM1_SERIAL.pid = 3 AND PARAM1_SERIAL.cid = contract.id AND PARAM1_SERIAL.val NOT LIKE '%Андрей Речкалов%'
LEFT JOIN contract_parameter_type_2 AS PARAM2 ON PARAM2.cid = contract.id
WHERE PARAM1.pid = 12
AND PARAM1.val NOT LIKE '%Երևան, Էրեբունի, էրեբունի 1, Նոր Արեշ 11, д. 91%'