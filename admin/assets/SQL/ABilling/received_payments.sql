SELECT
    cp.id AS 'Transaction ID',
    ct.title AS 'Contract ID',
    ct.comment AS 'User',
    cp.summa AS 'Payment sum',
    CASE
        WHEN cp.pt = 11 THEN 'EasyPay'
        WHEN cp.pt = 12 THEN 'Idram'
        WHEN cp.pt = 13 THEN 'Telcell'
    END AS 'P_SYSTEM',
    SUBSTRING(cp.comment, LOCATE('#', cp.comment) + 2) AS 'Transaction',
    cp.dt AS 'Synchronization Date'
FROM
    billing.contract AS ct
    INNER JOIN billing.contract_payment AS cp ON ct.id = cp.cid
WHERE
    cp.dt >= 'dateFrom'
    AND cp.dt <= 'dateTo'
    -- AND cp.pt IN (11, 12, 13)
    AND ct.comment NOT REGEXP '(Речкалов|ест|Նոր Արեշ 11, д. 91|est|юл|TEst|Yan|եստ|բաժանորդ|TEST|նուն|ազգանուն)'
    AND ct.title <> 9000019
ORDER BY
    cp.dt DESC;
