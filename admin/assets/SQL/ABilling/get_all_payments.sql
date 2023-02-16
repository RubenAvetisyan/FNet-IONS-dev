SET time_zone = 'Asia/Yerevan';

select
	cp.id as 'Transaction ID',
	ct.title as 'Contract ID',
	ct.comment as 'User',
	cp.summa as 'Payment sum',
    cpt.title as 'P_SYSTEM',
    SUBSTRING(cp.comment, LOCATE('# ', cp.comment) + 1) as 'Transaction',
	cp.lm as 'Syncronization Date'
FROM billing.contract as ct
inner join billing.contract_payment as cp
	on ct.id = cp.cid
left join contract_payment_types as cpt
	on cpt.id = cp.pt
where
		lm >= '2023-02-01 00։00։00'
	and lm <= '2023-02-12 23։59։59'
	-- and cp.pt in (11, 12, 13, 8)
	and ct.comment not like('%Речкалов%')
	and ct.comment not like('%ест%')
	and ct.comment not like('%est%')
	and ct.comment not like('%ест%')
	and ct.comment not like('%юл%')
	and ct.comment not like('%TEst%')
	and ct.comment not like('%Yan%')
	and ct.comment not like('%եստ%')
	and ct.comment not like('%բաժանորդ%')
	and ct.comment not like('%եստ%')
	and ct.comment not like('%TEST%')
	and ct.comment not like('%նուն%')
	and ct.comment not like('%ազգանուն%')
	and ct.title <> 9000019
	and cp.comment not like('%ест%')
    -- and cpt.title ='Безналичный платеж'
-- group by cpt.id
order by cp.lm desc