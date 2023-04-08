SELECT count(MAIN.id) as count, MAIN.title as employer FROM (SELECT
	process.id,
  process.status_id,
  process.status_user_id,
  min(process.status_dt) as `date`,
  process_link.object_title as contractNumber,
  user.title,
  process.groups
FROM erp.process
LEFT JOIN (SELECT link.process_id AS serviceChange_id, process.id as serviceConnection_id, process.* FROM erp.process
INNER JOIN process_link AS link ON link.object_id = process.id AND link.object_type = 'processMade'
INNER JOIN process AS P1 ON P1.id = link.process_id AND P1.type_id = 65
WHERE process.type_id = 7 AND process.status_id IN (9, 32)) AS EXCLUDE ON EXCLUDE.serviceConnection_id = process.id
LEFT JOIN process_link ON process_link.process_id = process.id AND process_link.object_type = 'contract:rb'
LEFT JOIN user ON user.id = process.status_user_id
WHERE process.type_id = 7 AND process.status_id in (9, 32) AND EXCLUDE.serviceConnection_id IS NULL
AND process.status_dt LIKE '2023-03%'
GROUP BY process_link.object_title) AS MAIN
GROUP BY MAIN.status_user_id