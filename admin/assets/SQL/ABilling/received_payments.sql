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
order by cp.lm desc