SELECT
MAIN.object_title, group_concat(DISTINCT MAIN.asd separator ', '),
MAIN.title, sum(MAIN.state), max(MAIN.closed) as `closed`, MAIN.emp as `Մասնագետի այց`
FROM (SELECT
	P.id,
	process_link.object_title,
	process_type.id as type_id,
	process_type.title as `asd`,
	st.status_id,
	process_status_title.title,
	P.close_dt as closed,
  CASE WHEN param_list.value = 1 THEN 'ԱՅՈ'
			 ELSE 'Ոչ'
  END as `emp`,
  process_type.id as tid,
	CASE WHEN (process_type.id=65 AND st.status_id) THEN 1
			 WHEN process_type.id=21 AND st.status_id = 9 THEN 1
       WHEN process_type.id=7 AND st.status_id = 9 THEN 0
			 ELSE 10
	END as `state`
	FROM erp.process_link 
	INNER JOIN process as P ON process_link.process_id = P.id
	LEFT JOIN process_type ON process_type.id = P.type_id
	LEFT JOIN process_status as st ON P.id = st.process_id AND P.status_id = st.status_id
	LEFT JOIN process_status_title ON process_status_title.id =st.status_id
  LEFT JOIN param_list ON param_list.id = P.id AND param_list.param_id = 2397
	where process_type.id in (7, 21, 65) AND st.status_id = 9 AND process_link.object_type = 'contract:rb'
) as MAIN
WHERE MAIN.closed > '2023-03-%' AND MAIN.closed <= now()
group by MAIN.object_title
order by MAIN.object_title, MAIN.asd