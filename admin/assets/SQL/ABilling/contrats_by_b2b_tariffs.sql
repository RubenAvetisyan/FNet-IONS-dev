SELECT ct.title, tg.id, plan.title, plan.config FROM billing.tariff_group as tg
inner join billing.tariff_group_tariff as gtarif
on tg.id = gtarif.tgid
inner join billing.tariff_plan as plan
on gtarif.tpid = plan.id
inner join billing.contract_tariff as ct_tariff
on ct_tariff.tpid = gtarif.tpid
inner join billing.contract as ct
on ct.id = ct_tariff.cid
where tg.title like '%b2b%'
group by plan.title