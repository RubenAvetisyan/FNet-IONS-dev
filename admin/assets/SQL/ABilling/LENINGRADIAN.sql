SELECT LEFT(contract.title, 7) as contract, street.title as `street` FROM billing.contract
LEFT JOIN contract_parameter_type_2 as pt2 ON pt2.cid = contract.id
LEFT JOIN address_house as house ON house.id = pt2.hid
LEFT JOIN address_street as street ON street.id = house.streetid
where street.title is not null and street.title = 'Լենինգրադյան' AND status = 0