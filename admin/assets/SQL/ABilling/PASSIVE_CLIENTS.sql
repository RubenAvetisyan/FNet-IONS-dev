SELECT 
	MAIN.contractNumber,
  MAIN.clientName,
  PARAMS.city AS 'Город',
	PARAMS.area AS 'Район',
	PARAMS.quarter AS 'Квартал',
	PARAMS.street AS 'Улица',
	CONCAT(PARAMS.house, PARAMS.frac, ' ', PARAMS.comment) AS 'Дом',
	if(isnull(PARAMS.flat), '', CONCAT('кв. ', PARAMS.flat)) as 'квартира',
	if(isnull(PARAMS.room) OR length(PARAMS.room) = 0, '', CONCAT('комната ', PARAMS.room)) as 'комната',
	if(isnull(PARAMS.pod) OR PARAMS.pod < 1 , '', CONCAT('под. ', PARAMS.pod)) as 'подъезд',
	if(isnull(PARAMS.floor) OR (PARAMS.flat >=0 AND PARAMS.floor < 1), '', CONCAT('эт. ', PARAMS.floor)) as 'этаж'
FROM (SELECT DISTINCT
    contract.id, contract.scid, LEFT(contract.title, 7) as contractNumber, PARAM1.val as clientName
FROM
    contract
        INNER JOIN
    (SELECT 
        title
    FROM
        (SELECT DISTINCT
        contract.title, t1.id
    FROM
        contract
    LEFT JOIN (SELECT DISTINCT
        LEFT(contract.title, 7) AS id
    FROM
        billing.contract
    WHERE
        status = 0 AND title_pattern_id = 0
            AND contract.title NOT LIKE '300%') AS t1 ON contract.title = t1.id
    WHERE
        LENGTH(contract.title) = 7) AS MAIN
    WHERE
        MAIN.id IS NULL) AS t2 ON t2.title = LEFT(contract.title, 7)
        INNER JOIN
    contract_parameter_type_1 AS PARAM1 ON PARAM1.cid = contract.id
        AND PARAM1.pid = 13
WHERE
    contract.status NOT IN (3 , 6)
        AND PARAM1.val NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|թեստ|Թեստ|բաժանորդ|TEST|Անուն|Ազգանուն)') AS MAIN
INNER JOIN (
								SELECT 
										c.scid,
										CAST(ah.house AS UNSIGNED) AS house,
										ah.frac,
										ah.comment,
										aa.title AS area,
										aq.title AS quarter,
										ast.title AS street,
										ac.title AS city,
                    cpt2.flat,
                    cpt2.room,
                    cpt2.pod,
                    cpt2.floor
								FROM
										billing.contract c
										INNER JOIN billing.contract_parameter_type_2 cpt2 ON c.id = cpt2.cid
										INNER JOIN billing.address_house ah ON cpt2.hid = ah.id
										INNER JOIN billing.address_quarter aq ON ah.quarterId = aq.id
										INNER JOIN billing.address_street ast ON ah.streetId = ast.id
										INNER JOIN billing.address_area aa ON ah.areaId = aa.id
										INNER JOIN billing.address_city ac ON aq.cityId = ac.id
						) AS PARAMS ON PARAMS.scid = coalesce(MAIN.id, MAIN.scid)