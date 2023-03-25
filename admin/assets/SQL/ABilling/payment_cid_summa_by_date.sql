select
  LEFT(contract.title, 7) as 'contractNumber',
	sum(cp.summa) as 'summa'
FROM billing.contract_payment as cp
LEFT JOIN contract ON contract.id = cp.cid
LEFT join billing.contract_payment_types as PT
	on PT.id = cp.pt
where
		dt >= '2001-01-01'
	and dt <= current_date()
  and (select pt.title from billing.contract_payment_types as pt where pt.id = PT.up) <> 'Тестовые платежи'
  AND LEFT(contract.title, 7) in (@contractNumber)
group by cp.cid