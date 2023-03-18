SELECT accounts.uid, accounts.type, accounts.name, accounts.inn, accounts.pass_sernum, accounts.pass_no, accounts.pass_issuedate,
accounts.pass_issuedep, accounts.birthdate, accounts.mobile, accounts.phone, accounts.email, accounts_addr.address, agreements.agrm_id, agreements.number, 
agreements.date as agrm_date, agreements.balance, agreements.descr, vgroups.acc_ondate
FROM billing.accounts
left join accounts_addr on accounts.uid=accounts_addr.uid left join agreements on accounts.uid=agreements.uid left join vgroups on agreements.agrm_id=vgroups.agrm_id
where accounts_addr.type=0;