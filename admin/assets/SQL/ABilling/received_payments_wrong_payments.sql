select
	cp.id as 'Transaction ID',
	ct.title as 'Contract ID',
    ct.comment as 'User',
    cp.summa as 'Payment sum',
    cp.comment as 'Transaction Type',
    cp.lm as 'Syncronization Date'
FROM billing.contract as ct
inner join billing.contract_payment as cp
on ct.id = cp.cid
where
	lm > "2022-11-11"
	and cp.pt in (11, 12, 13)
    and cp.lm >= '2023-01-25'
    and ct.title not in (5517400,
7008584,
7038048,
7040128,
7008484,
7023924,
7033932,
5104924,
7040143)
order by cp.lm desc