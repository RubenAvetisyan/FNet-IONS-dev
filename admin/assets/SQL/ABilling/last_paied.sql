select * from contract_payment as CP
left join contract as C
	on CP.cid = C.id