select
	date,
	partialAddress
from (
		select 
			substring_index(c.creation_date, '-', 2) as 'date',
			locate
		from billing.groups as a
		inner join billing.gr_staff as b
		inner join billing.vgroups as c
		inner join billing.vgroups_addr as c_addr
		  on a.group_id = b.group_id
		  and b.vg_id = c.vg_id
		  and c_addr.vg_id = c.vg_id
		  and c.creation_date >= '?'
		where 
			whereBody
) as nf
group by date