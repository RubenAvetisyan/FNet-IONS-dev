SELECT str_value as IP_address, billing.accounts.login, billing.accounts.name, billing.accounts.phone,  billing.accounts.mobile, billing.vgroups_addr.address,
if(billing.vgroups.blocked=4,'BLOCKED', if(billing.vgroups.blocked=0,'ACTIVE',"")) as status, if(billing.vgroups.blocked<>0, billing.vgroups.block_date, "") as block_date
FROM billing.vgroups_addons_vals
join billing.vgroups using(vg_id) join billing.accounts on billing.vgroups.uid=billing.accounts.uid
join  billing.vgroups_addr on billing.vgroups.vg_id=billing.vgroups_addr.vg_id
where billing.vgroups_addons_vals.name='public_ip' and blocked <>10
order by str_value;