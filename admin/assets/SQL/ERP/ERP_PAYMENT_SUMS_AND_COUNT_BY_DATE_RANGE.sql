SELECT MAIN.* FROM (
SELECT
	link.object_type,
  link.object_id as link_id,
  customer_link.object_id,
  customer_link.object_title as contractNumber,
  process.*,
  param_list.value as `Payment_Type`,
  process_type.title as p_title,
  sum(param_text.value) as summa,
  count(param_text.value) as count,
  max(param_text.last_update) as dt
FROM erp.param_text
LEFT JOIN process ON process.id = param_text.id
LEFT JOIN process_link AS link ON link.process_id = process.id
LEFT JOIN process_type ON process_type.id = process.type_id
LEFT JOIN customer On customer.id = link.object_id AND link.object_type = 'customer'
LEFT JOIN customer_link ON customer_link.customer_id = customer.id
LEFT JOIN param_list ON param_list.id = process.id AND param_list.param_id = 2290
where param_text.param_id = 2289
AND customer_link.object_title IS NOT NULL
AND customer_link.object_title NOT LIKE '%3000%'
AND customer.title NOT REGEXP '(Андрей|Речкалов)'
GROUP BY customer_link.object_title
) AS MAIN
WHERE MAIN.dt >= '2023-03-01' AND MAIN.dt <= '2023-03-31'