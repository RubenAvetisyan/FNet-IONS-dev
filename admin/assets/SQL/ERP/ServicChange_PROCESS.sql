SELECT link.process_id AS serviceChange_id, P1.type_id, process.id as serviceConnection_id, process.* FROM erp.process
INNER JOIN process_link AS link ON link.object_id = process.id AND link.object_type = 'processMade'
INNER JOIN process AS P1 ON P1.id = link.process_id AND P1.type_id = 65
WHERE process.type_id = 7 AND process.status_id IN (9, 32)