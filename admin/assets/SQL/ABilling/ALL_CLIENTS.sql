SELECT DISTINCT
    LEFT(contract.title, 7) as contractNumber, PARAM1.val as clientName
FROM
    contract
INNER JOIN
    contract_parameter_type_1 AS PARAM1 ON PARAM1.cid = contract.id AND PARAM1.pid = 13
WHERE
		LENGTH(contract.title) = 7
    AND contract.status NOT IN (3 , 6)
		AND PARAM1.val NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|թեստ|Թեստ|բաժանորդ|TEST|Անուն|Ազգանուն)'