SELECT
	customerNumber,
  customerName,
  country,
  region,
  city,
  quarter,
  street,
  count(house) as `count`
FROM (SELECT 
	customer_link.object_title as customerNumber, 
  customer.title as customerName,
  country,
  address.region as region,
  address.city as city,
  address.quarter as `quarter`, 
  address.street, 
  address.house,
  max(param_address.last_update) as dt,
  date(customer.date_created) AS aggrimentDate
FROM customer
LEFT JOIN (SELECT 'ՀԱՅԱՍՏԱՆ' as country) as country ON true
INNER JOIN customer_link ON customer_link.customer_id = customer.id
LEFT JOIN param_list ON param_list.id = customer.id
LEFT JOIN param_address ON param_address.id = param_list.id AND param_address.param_id = coalesce(27, 23, 11)
LEFT JOIN (SELECT 
	area.id as areaId, area.title as region, 
  city.id as cityId, city.title as `city`, 
  Q.id as `quarter_id`, Q.title as `quarter`,
  S.id as `street_id`, S.title as `street`,
  H.id as `house_id`, concat(H.house, H.frac) as `house`
FROM address_city as city
INNER JOIN param_list as pl on pl.id = city.id
INNER JOIN address_subject_area as area on area.id = pl.value
INNER JOIN address_quarter as Q On Q.city_id = city.id
INNER JOIN address_street as S ON S.city_id = city.id
INNER JOIN address_house as H ON H.street_id = S.id AND H.quarter_id = Q.id
WHERE pl.param_id = 35) as address ON address.house_id = param_address.house_id
WHERE 
	customer_link.object_title IN (contractNumbers)
  AND customer_link.object_title NOT LIKE '%3000%'
  AND address.region is not null
  AND date(customer.date_created) >= '2022-01-01'
  AND date(customer.date_created) <= current_date()
  FILTERS
GROUP BY customer_link.object_title) AS MAIN
GROUPS