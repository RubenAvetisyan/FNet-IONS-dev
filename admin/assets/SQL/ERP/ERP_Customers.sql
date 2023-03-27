SELECT 
    customer_link.object_title AS contractNumber,
    LEFT(CONCAT(customer.date_created, ''), 10) AS aggrimentDate,
    customer.title AS customerName,
    GROUP_CONCAT(DISTINCT phone.number  SEPARATOR ',') AS phone,
    addressCity.title as `city`,
    addressQuarter.title as `quarter`,
		addressStreet.title as `street`,
    concat(addressHouse.house, if(locate('/', addressHouse.frac)> 0, addressHouse.frac, ' '), addressHouse.frac) as `house`,
    customer_link.object_id AS contractId,
    CASE 
        WHEN param_group_title.id = 1 THEN 'Ֆիզիկական անձ' 
        WHEN param_group_title.id = 2 THEN 'Իրավաբանական անձ'
        WHEN param_group_title.id = 3 THEN 'Անհատ ձեռներեց'
        ELSE '21' 
    END AS customerType
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
LEFT JOIN (
	SELECT 
		id,
    param_address.comment,
    param_address.custom,
    param_address.flat,
    param_address.floor,
    param_address.house_id,
    param_address.n,
    param_address.param_id,
    param_address.pod,
    param_address.room,
    param_address.value,
    max(param_address.last_update) as last_update
	from param_address
  group by id
) as paramAddress ON customer.id = paramAddress.id
LEFT JOIN (
	SELECT id, address_house.house, address_house.frac, address_house.quarter_id, address_house.street_id, max(address_house.last_update) as `last_update` from address_house
  group by id
) as addressHouse ON addressHouse.id = paramAddress.house_id
LEFT JOIN (
	SELECT id, address_street.title, max(address_street.last_update) as last_update from address_street
  group by id
) as addressStreet ON addressStreet.id = addressHouse.street_id
LEFT JOIN (
	SELECT id, address_quarter.title, address_quarter.city_id, max(address_quarter.last_update) as last_update from address_quarter
  group by id
) as addressQuarter ON addressQuarter.id = addressHouse.quarter_id
LEFT JOIN (
	SELECT id, address_city.title, address_city.country_id, max(address_city.last_update) as last_update from address_city
  group by id
) as addressCity ON addressQuarter.city_id = addressCity.id
LEFT JOIN param_list ON param_list.id = addressHouse.id
WHERE 
    customer.title NOT REGEXP '(Речкалов|ест|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|նուն|ազգանուն)'
    AND customer_link.object_title <> 9000019
    AND customer_link.object_title IN (@contractNumbers)
GROUP BY customer_link.object_title
