SELECT vgroups.login, accounts.name, if(blocked=4,'BAL.BLOCK','ACT') as state, acc_ondate as on_date, agreements.balance, pay_date, 
payments.amount as payed_amount, vgroups_addr.address, vgroups.descr
FROM billing.vgroups 
join agreements on vgroups.login=agreements.number join billing.vgroups_addr using(vg_id) join accounts on vgroups.uid=accounts.uid
left join payments on vgroups.agrm_id=payments.agrm_id
where vgroups.tar_id =181 and blocked <> 10 and vgroups.descr is null
order by vg_id;