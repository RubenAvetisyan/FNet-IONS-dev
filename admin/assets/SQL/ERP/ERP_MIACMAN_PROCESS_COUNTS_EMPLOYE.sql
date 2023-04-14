SELECT count(MAIN.id) as count, MAIN.userName as employee, MAIN.user_id as user_id, group_concat(MAIN.contractNumber) as contractNumbers FROM (
SELECT * FROM (
		SELECT * FROM (SELECT
			process.id,
			process.status_id,
			process.status_user_id,
			min(process.status_dt) as `date`,
			process_link.object_title as contractNumber,
			user.title,
			process.groups,
			process_log.dt as `date_of_birth`
		FROM erp.process
		LEFT JOIN (SELECT link.process_id AS serviceChange_id, process.id as serviceConnection_id, process.* FROM erp.process
		INNER JOIN process_link AS link ON link.object_id = process.id AND link.object_type = 'processMade'
		INNER JOIN process AS P1 ON P1.id = link.process_id AND P1.type_id = 65
		WHERE process.type_id = 7 AND process.status_id IN (9, 32)) AS EXCLUDE ON EXCLUDE.serviceConnection_id = process.id
		LEFT JOIN process_link ON process_link.process_id = process.id AND process_link.object_type = 'contract:rb'
		LEFT JOIN user ON user.id = process.status_user_id
		LEFT JOIN process_log ON process_log.id = process.id
		WHERE process.type_id = 7 AND process.status_id in (9, 32) AND EXCLUDE.serviceConnection_id IS NULL
    AND process_link.object_title NOT LIKE '%Андрей Речкалов%'
		GROUP BY process_link.object_title) AS t1
		LEFT JOIN (
			SELECT process_log.id as log_p_id, process_log.dt, process_log.user_id, user.title as userName
      FROM erp.process_log
      LEFT JOIN user ON user.id = process_log.user_id
      WHERE user_id <> 0 AND dt LIKE CONCAT(DATE_FORMAT(NOW(), '%Y-%m'), '%') AND data LIKE '%Միացված%'
		) AS t2 ON t2.log_p_id = t1.id
		WHERE t2.log_p_id IS NOT NULL
) AS PRE_MAIN
) AS MAIN
GROUP BY MAIN.user_id