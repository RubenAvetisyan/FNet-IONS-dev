use billing;

SELECT
	contract_payment_types.id,
	contract_payment_types.title,
	count(contract_payment.id),
	sum(contract_balance.summa2)
FROM contract_payment_types
	LEFT JOIN contract_payment ON contract_payment.pt=contract_payment_types.id
	LEFT JOIN contract_balance ON contract_balance.cid=contract_payment.cid
  LEFT JOIN contract ON contract_balance.cid = contract.id
WHERE left(contract.title, 1) > 3 
-- 	AND contract_payment.dt >= '2023-02-01'
	AND contract.title NOT LIKE '9000019%' 
  AND contract_payment.pt not in (7)
	AND contract.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|Անուն|անուն|ազգանուն|Ազգանուն)'
GROUP BY contract_payment_types.id