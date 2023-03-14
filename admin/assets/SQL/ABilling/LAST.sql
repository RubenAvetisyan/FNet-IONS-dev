use billing;

SELECT 
SUBSTRING(C.title, LOCATE('/', C.title) + 1) as 'Բաժանորդի կոդ',
C_Param1.val as name,
CB.summa1 as 'սկզբնական մնացորդ',
CB.summa2 as 'մուտք',
(SELECT summa FROM billing.contract_payment as CP where CP.cid = C.id and lm = (select max(lm) from contract_payment where CP.id = id) limit 1) as 'Summa',
-- Summa.dt as 'Last paied Date',
CB.summa3 as 'եկամուտ',
CB.summa4 as 'ծախս',
mm as 'n ամսի դրությամբ',
yy as 'տարի',
CB.summa1 + CB.summa2 + CB.summa3 - CB.summa4 as 'վերջնական մնացորդ'
FROM billing.contract_balance as CB
left join contract as C
	on C.id = CB.cid
left join contract_parameter_type_1 as C_Param1
	on C_Param1.cid = C.id and C_Param1.pid = 13
where LEFT(C.title, 1) > 3 and C.pgid = 1
group by CB.summa1