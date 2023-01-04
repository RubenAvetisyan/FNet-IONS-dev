select
	cp.id as 'Transaction ID',
	ct.title as 'Contract ID',
    ct.comment as 'User',
    cp.summa as 'Payment sum',
    cp.pt as 'Payment type',
    payment_types.title as 'Payment title',
    cp.comment as 'Transaction Type',
    cp.lm as 'Syncronization Date'
FROM billing.contract as ct
inner join billing.contract_payment as cp
inner join billing.contract_payment_types as payment_types
on ct.id = cp.cid
	and payment_types.id = cp.pt
where
	lm >= 'fromDate' and lm <= 'toDate'
	-- and cp.pt in (8)
    and ct.title in (
		conractArray
    )
group by ct.title
order by cp.lm desc