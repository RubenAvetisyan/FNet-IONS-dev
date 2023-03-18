SELECT vgroups.login, accounts.name, vgroups_addr.address, payments.amount, if(accounts.type=1,'B2B','') as type
FROM billing.vgroups 
join agreements on vgroups.login=agreements.number join billing.vgroups_addr using(vg_id) join accounts on vgroups.uid=accounts.uid
left join payments on vgroups.agrm_id=payments.agrm_id
where pay_date between '2022-07-01 00:00:00' and '2022-08-01 00:00:00'
order by login;