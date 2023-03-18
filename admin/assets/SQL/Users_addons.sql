SELECT vgroups.login, vgroups.blocked, vgroups_addons_vals.str_value, if(vgroups.blocked<>0,vgroups.block_date,"") as block_date, tarifs.descr
FROM billing.vgroups_addons_vals
join vgroups using(vg_id) join tarifs using(tar_id)
where str_value like '%http://%'
order by login;