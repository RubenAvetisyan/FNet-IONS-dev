SELECT * FROM (SELECT DISTINCT
    LEFT(customer_link.object_title, 7) AS contractNumber,
    customer_link.object_id,
    customer.title AS customerName,
    country,
    addressSubjectArea.title as `region`,
    address.city as `city`,
    address.`quarter` as `quarter`,
		address.street as `street`,
    address.house as `house`,
    date(customer.date_created) AS aggrimentDate
FROM customer
LEFT JOIN (SELECT 'Հայաստան' as country) as country ON true
INNER JOIN customer_link On customer_link.customer_id = customer.id
LEFT JOIN (
	SELECT
		param_address.id as param_address_id,
		address_city.id as city_id,
    address_city.title as city,
		address_quarter.title as `quarter`,
		address_street.title as street,
		address_house.id as house_id,
		concat(address_house.house, if(locate('/', address_house.frac)> 0, address_house.frac, ' '), address_house.frac) as house
	FROM param_address
	LEFT JOIN address_house ON address_house.id = param_address.house_id
	LEFT JOIN address_street ON address_street.id = address_house.street_id
	LEFT JOIN address_quarter ON address_quarter.id = address_house.quarter_id
	LEFT JOIN address_city ON address_quarter.city_id = address_city.id
	WHERE param_address.param_id = coalesce(27, 23, 11)
) as address ON address.param_address_id = customer.id
LEFT JOIN (
	SELECT address_city.id as address_city_id, param_list.param_id, param_list.value, param_list.last_update, address_subject_area.title FROM erp.param_list
	LEFT JOIN address_subject_area ON address_subject_area.id = param_list.value
	INNER JOIN address_city ON address_city.id = param_list.id
	WHERE param_list.param_id = 35
) AS addressSubjectArea ON addressSubjectArea.address_city_id = address.city_id
LEFT JOIN (
    SELECT 
        replace(SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT phone  SEPARATOR ','), ',', -1), '/', '') AS number, param_phone_item.id 
    FROM erp.param_phone_item
    WHERE param_id IN (10, 85, 2355)
    GROUP BY id
) AS phone ON phone.id = customer.id
WHERE 
		customer_link.object_title NOT LIKE '%3000%'
    AND customer.title NOT LIKE '%Андрей Речкалов%'
		AND customer.title NOT LIKE '%Речкалов Андрей%'
		AND customer_link.object_title
    AND addressSubjectArea.title IS NOT NULL
) as MAIN 
WHERE MAIN.country = 'Հայաստան'
FILTERS
GROUPS
