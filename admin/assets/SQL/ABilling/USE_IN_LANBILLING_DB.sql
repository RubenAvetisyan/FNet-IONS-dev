select accounts.login, billing.agreements.date from accounts
join billing.agreements using(uid)
where login in (contractNumbers)