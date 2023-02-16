select
	cp.id as 'Transaction ID',
	ct.title as 'Contract ID',
	ct.comment as 'User',
	cp.summa as 'Payment sum',
    CASE
		WHEN cp.pt = 11 THEN 'EasyPay'
        WHEN cp.pt = 12 THEN 'Idram'
        WHEN cp.pt = 13 THEN 'Telcell'
	END as 'P_SYSTEM',
    SUBSTRING(cp.comment, LOCATE('#', cp.comment) + 2) as 'Transaction',
	cp.lm as 'Syncronization Date'
FROM billing.contract as ct
inner join billing.contract_payment as cp
	on ct.id = cp.cid
where
		lm >= 'dateFrom'
	and lm <= 'dateTo'
	and cp.pt in (11, 12, 13)
	and ct.comment not like('%Речкалов%')
	and ct.comment not like('%ест%')
	and ct.comment not like('%est%')
	and ct.comment not like('%ест%')
	and ct.comment not like('%юл%')
	and ct.comment not like('%TEst%')
	and ct.comment not like('%Yan%')
	and ct.comment not like('%թեստ%')
	and ct.comment not like('%տեստ%')
	and ct.comment not like('%Թեստ%')
	and ct.comment not like('%Տեստ%')
	and ct.comment not like('%TEST%')
	and ct.comment not like('%անուն%')
	and ct.comment not like('%Ազգանուն%')
	and ct.comment not like('%զգանուն%')
	and ct.title <> 9000019
order by cp.lm desc