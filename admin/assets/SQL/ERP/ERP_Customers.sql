SELECT 
    customer_link.object_title AS contract,
    LEFT(CONCAT(customer.date_created, ''), 10) AS aggrimentDate,
    customer.title AS customerName,
    GROUP_CONCAT(DISTINCT phone.number  SEPARATOR ',') AS phone,
    customer_link.object_id AS contractId,
    CASE 
        WHEN param_group_title.id = 1 THEN 'Ֆիզիկական անձ' 
        WHEN param_group_title.id = 2 THEN 'Իրավաբանական անձ'
        WHEN param_group_title.id = 3 THEN 'Անհատ ձեռներեց'
        ELSE '21' 
    END AS customerType,
    CASE 
        WHEN param_list.value = 1 THEN 11 
        WHEN param_list.value = 2 THEN '16' 
        ELSE '21' 
    END AS payDay
FROM customer_link
JOIN customer ON customer.id = customer_link.customer_id
JOIN param_group_title ON customer.param_group_id = param_group_title.id
LEFT JOIN (
    SELECT 
        replace(SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT phone  SEPARATOR ','), ',', -1), '/', '') AS number, param_phone_item.id 
    FROM erp.param_phone_item
    WHERE param_id IN (10, 85, 2355)
    GROUP BY id
) AS phone ON phone.id = customer.id
LEFT JOIN param_address ON customer.id = param_address.id
LEFT JOIN address_house ON address_house.id = param_address.house_id
LEFT JOIN param_list ON param_list.id = address_house.id
WHERE 
    customer.title NOT REGEXP '(Речкалов|ест|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|նուն|ազգանուն)'
    AND customer_link.object_title <> 9000019
    AND LEFT(customer_link.object_title, 1) > 3
    AND customer_link.object_title IN (contractNumbers)
GROUP BY customer_link.object_title
