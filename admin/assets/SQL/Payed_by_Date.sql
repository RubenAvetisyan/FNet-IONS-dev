SELECT billing.vgroups.login, billing.groups.name, billing.payments.local_date
FROM billing.payments 
join billing.vgroups using(agrm_id) join billing.gr_staff using(vg_id) join billing.groups using(group_id) 
where local_date between '2022-04-22' and '2022-05-02' and billing.vgroups.blocked=0 and billing.groups.name <> 'block' 
 and billing.groups.name <> 'перерасчет'
 group by billing.payments.agrm_id having count(billing.payments.agrm_id)=1
 order by billing.vgroups.login;