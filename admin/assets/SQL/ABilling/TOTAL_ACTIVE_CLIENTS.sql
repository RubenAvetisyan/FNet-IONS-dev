SELECT DISTINCT
    count(LEFT(contract.title, 7)) as total_active_count
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
            AND contract.title NOT LIKE '%CCTV%'
            AND LEFT(contract.title, 7) NOT IN (9000001,
9000003,
9000004,
9000005,
9000006,
9000007,
9000008,
9000009,
9000010,
9000011,
9000012,
9000013,
9000015,
9000016,
9000017,
9000020,
9000021,
9000023,
9000024,
9000026,
9000027,
9000029,
9000034,
9000044,
9000045,
9000046,
9000060,
9000072,
9000093,
9000097,
9000124,
9000144,
9000145,
9000146,
9000147,
9000149,
9000150,
9000151,
9000152,
9000153,
9000154,
9000155,
9000156,
9000157,
9000159,
9000161,
9000162,
9000163,
9000164,
9000165,
9000166,
9000167,
9000168,
9000169,
9000171,
9000172,
9000173,
9000174,
9000176,
9000178,
9000179,
9000180,
9000181,
9000182,
9000183,
9000184,
9000185,
9000186,
9000188,
9000189,
9000190,
9000191,
9000192,
9000193,
9000195,
9000196,
9000197,
9000198,
9000199,
9000201,
9000202,
9000203,
9000204,
9000205,
9000207,
9000208,
9000209,
9000211,
9000212,
9000217,
9000218,
9000219,
9000222,
9000223,
9000224,
9000225,
9000227,
9000228,
9000229,
9000230,
9000231,
9000232,
9000234,
9000235,
9000237,
9000238,
9000239,
9000240,
7026510,
9000241,
9000242,
9000243,
9000244,
9000246,
9000247,
5507558,
5507788,
9000248,
9000250,
9000251,
5517400,
9000253,
9000254,
9000256,
9000257,
9000258,
9000259,
9000261,
9000263,
9000264,
5803694,
5804369,
7030273,
5509554,
9000265,
5510166,
7025223,
7029658,
9000266,
9000267,
5508130,
9000269,
9000270,
9000274,
9000275,
5600883,
5410652,
7028284,
5510456,
9000287,
9000289,
9000290,
9000291,
9000292,
9000293,
5518257,
5513319,
9000305,
7026110,
9000310,
7011010,
9000311,
9000314,
9000315,
9000316,
9000317,
9000318,
7028432,
5401768,
5601869,
7024858,
5509715,
7022302,
5516144,
5803749,
7029975,
9000325,
9000326,
9000327,
7028119,
7009678,
7019351,
9000341,
9000345,
9000348,
7037091,
9000353,
9000355,
7029884,
5522638,
7023604,
7025758,
9000385,
9000389,
9000391,
9000393,
9000394,
9000399,
9000400,
9000403,
9000405,
9000406,
9000407,
9000408,
9000418,
9000438,
9000454,
9000463,
9000466,
9000475,
9000476,
9000478,
9000480,
9000482,
9000496,
9000497,
9000504,
9000511,
9000513,
9000514,
9000515,
5514942,
9000569,
9000570,
9000612,
9000624,
9000625,
9000626,
9000627,
9000628,
9000647,
9000648,
9000689,
9000752,
9000823,
9000835,
9000917,
9001022,
9001033,
9001034,
9001108,
9001111,
9001120,
9001127,
9001129,
9001148,
9001150,
9001153,
9001158,
9001292,
9001302,
9001307,
9001311,
9001316,
9001317,
9001319,
9002025,
9002046,
9002047,
9002049,
9002063,
9002064,
9002103,
9002104,
9002105,
9002106,
9002107,
9002108,
9002109)) AS t1 ON contract.title = t1.id
    WHERE
        LENGTH(contract.title) = 7) AS MAIN
    WHERE
        MAIN.id IS NOT NULL) AS t2 ON t2.title = LEFT(contract.title, 7)
        INNER JOIN
    contract_parameter_type_1 AS PARAM1 ON PARAM1.cid = contract.id
        AND PARAM1.pid = 13
WHERE
    contract.status NOT IN (3 , 6)
        AND LEFT(contract.title, 7) NOT IN (9000001,
9000003,
9000004,
9000005,
9000006,
9000007,
9000008,
9000009,
9000010,
9000011,
9000012,
9000013,
9000015,
9000016,
9000017,
9000020,
9000021,
9000023,
9000024,
9000026,
9000027,
9000029,
9000034,
9000044,
9000045,
9000046,
9000060,
9000072,
9000093,
9000097,
9000124,
9000144,
9000145,
9000146,
9000147,
9000149,
9000150,
9000151,
9000152,
9000153,
9000154,
9000155,
9000156,
9000157,
9000159,
9000161,
9000162,
9000163,
9000164,
9000165,
9000166,
9000167,
9000168,
9000169,
9000171,
9000172,
9000173,
9000174,
9000176,
9000178,
9000179,
9000180,
9000181,
9000182,
9000183,
9000184,
9000185,
9000186,
9000188,
9000189,
9000190,
9000191,
9000192,
9000193,
9000195,
9000196,
9000197,
9000198,
9000199,
9000201,
9000202,
9000203,
9000204,
9000205,
9000207,
9000208,
9000209,
9000211,
9000212,
9000217,
9000218,
9000219,
9000222,
9000223,
9000224,
9000225,
9000227,
9000228,
9000229,
9000230,
9000231,
9000232,
9000234,
9000235,
9000237,
9000238,
9000239,
9000240,
7026510,
9000241,
9000242,
9000243,
9000244,
9000246,
9000247,
5507558,
5507788,
9000248,
9000250,
9000251,
5517400,
9000253,
9000254,
9000256,
9000257,
9000258,
9000259,
9000261,
9000263,
9000264,
5803694,
5804369,
7030273,
5509554,
9000265,
5510166,
7025223,
7029658,
9000266,
9000267,
5508130,
9000269,
9000270,
9000274,
9000275,
5600883,
5410652,
7028284,
5510456,
9000287,
9000289,
9000290,
9000291,
9000292,
9000293,
5518257,
5513319,
9000305,
7026110,
9000310,
7011010,
9000311,
9000314,
9000315,
9000316,
9000317,
9000318,
7028432,
5401768,
5601869,
7024858,
5509715,
7022302,
5516144,
5803749,
7029975,
9000325,
9000326,
9000327,
7028119,
7009678,
7019351,
9000341,
9000345,
9000348,
7037091,
9000353,
9000355,
7029884,
5522638,
7023604,
7025758,
9000385,
9000389,
9000391,
9000393,
9000394,
9000399,
9000400,
9000403,
9000405,
9000406,
9000407,
9000408,
9000418,
9000438,
9000454,
9000463,
9000466,
9000475,
9000476,
9000478,
9000480,
9000482,
9000496,
9000497,
9000504,
9000511,
9000513,
9000514,
9000515,
5514942,
9000569,
9000570,
9000612,
9000624,
9000625,
9000626,
9000627,
9000628,
9000647,
9000648,
9000689,
9000752,
9000823,
9000835,
9000917,
9001022,
9001033,
9001034,
9001108,
9001111,
9001120,
9001127,
9001129,
9001148,
9001150,
9001153,
9001158,
9001292,
9001302,
9001307,
9001311,
9001316,
9001317,
9001319,
9002025,
9002046,
9002047,
9002049,
9002063,
9002064,
9002103,
9002104,
9002105,
9002106,
9002107,
9002108,
9002109)
