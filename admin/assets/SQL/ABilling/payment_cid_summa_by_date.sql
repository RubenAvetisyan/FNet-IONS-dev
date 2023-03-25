select
  LEFT(contract.title, 7) as 'contractNumber',
	sum(cp.summa) as 'summa'
FROM billing.contract_payment as cp
LEFT JOIN contract ON contract.id = cp.cid
LEFT join billing.contract_payment_types as PT
	on PT.id = cp.pt
where
		dt >= '2022-11-01'
	and dt <= current_date()
  AND LEFT(cp.cid, 1) <> 3
  and PT.up IN (3, 6)
  AND LEFT(contract.title, 7) in (@contractNumber)
group by cp.cid