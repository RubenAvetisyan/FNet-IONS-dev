SELECT * FROM contract
left join contract_parameter_type_1_log as contract_params
	on contract_params.cid = contract.id
where contract_params.val in('coupon')