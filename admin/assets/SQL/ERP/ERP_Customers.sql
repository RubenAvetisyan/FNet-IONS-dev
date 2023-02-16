SELECT
    customer_link.object_title as 'contract',
    left(concat(customer.date_created, ''), 10) as 'aggrimentDate',
	customer.title as 'customerName',
    replace(phone.number, ",", ", ") as 'phone',
    customer_link.object_id as 'contractId',
    CASE 
	   WHEN param_group_title.id = 1 THEN 'Ֆիզիկական անձ' 
	   WHEN param_group_title.id = 2 THEN 'Իրավաբանական անձ'
       WHEN param_group_title.id = 3 THEN 'Անհատ ձեռներեց'
	   ELSE '21' 
	END AS 'customerType',
	CASE 
	   WHEN param_list.value = 1 THEN 11 
	   WHEN param_list.value = 2 THEN '16' 
	   ELSE '21' 
	END AS 'payDay'
FROM customer_link
join customer 
	on customer.id = customer_link.customer_id
join param_group_title
	on customer.param_group_id = param_group_title.id
join (SELECT GROUP_CONCAT(
	if(length(phone) > 11, replace(concat(left(phone, 11), ",",mid(phone, 12, 1000)), " ", ""), phone)
    SEPARATOR ', '
    ) as 'number', param_phone_item.* FROM erp.param_phone_item
	where param_id in (10, 85, 2355)
	group by id) as phone
    on phone.id = customer.id
left join param_address
	on customer.id = param_address.id
left join address_house
	on address_house.id = param_address.house_id
left join param_list
	on param_list.id = address_house.id
where 
	customer.title not like('%Речкалов%')
    and customer.title not like('%ест%')
    and customer.title not like('%est%')
    and customer.title not like('%ест%')
    and customer.title not like('%юл%')
    and customer.title not like('%TEst%')
    and customer.title not like('%Yan%')
    and customer.title not like('%եստ%')
    and customer.title not like('%բաժանորդ%')
    and customer.title not like('%եստ%')
    and customer.title not like('%TEST%')
    and customer.title not like('%նուն%')
    and customer.title not like('%ազգանուն%')
    and customer_link.object_title <> 9000019
	and left(customer_link.object_title, 1) > 3
    and customer_link.object_title in (contractNumbers)
group by customer_link.object_title