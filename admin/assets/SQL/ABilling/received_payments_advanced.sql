select
	cp.id as 'Transaction ID',
	ct.title as 'Contract ID',
	ct.comment as 'User',
	cp.summa as 'Payment sum',
    if(PT.up > 0, (select pt.title from billing.contract_payment_types as pt where pt.id = PT.up), PT.title) as 'P_TYPE',
    PT.title as 'P_SYSTEM',
    SUBSTRING(cp.comment, LOCATE('#', cp.comment) + 2) as 'Transaction',
	cp.dt as 'Syncronization Date'
FROM billing.contract as ct
inner join billing.contract_payment as cp
	on ct.id = cp.cid
inner join billing.contract_payment_types as PT
	on PT.id = cp.pt
where
		dt >= 'dateFrom'
	and dt <= 'dateTo'
	and ct.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|Անուն|անուն|ազգանուն|Ազգանուն)'
	and ct.title <> 9000019
order by cp.lm desc