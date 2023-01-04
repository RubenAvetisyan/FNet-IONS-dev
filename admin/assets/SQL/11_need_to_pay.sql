SELECT billing.vgroups.login,
    billing.accounts.name,
    billing.accounts.mobile,
    billing.accounts.phone,
    billing.tarifs.descr as Tarif,
    billing.service_categories.above as price,
    billing.agreements.balance,
    if(
		billing.services.serv_cat_idx=1,0,2000
    ) as add_service,
	(
		SELECT right(billing.actions.name,length(actions.name)-locate('-',actions.name))  
		FROM billing.action_staff
		join billing.actions
		on billing.action_staff.action_id = billing.actions.record_id
		where
			billing.action_staff.uid=billing.vgroups.uid
			and billing.action_staff.dtfrom < now()
			and billing.action_staff.dtto > now() limit 1
	) as action_price,
	if(
		(
			SELECT right(billing.actions.name,length(actions.name)-locate('-',actions.name))
			FROM billing.action_staff
			join billing.actions
			on billing.action_staff.action_id = billing.actions.record_id
			where
				billing.action_staff.uid=billing.vgroups.uid
				and billing.action_staff.dtfrom < now()
				and billing.action_staff.dtto > now() limit 1
		) is null,
		billing.service_categories.above,
		(
			SELECT right(billing.actions.name,length(actions.name)-locate('-',actions.name))
			FROM billing.action_staff
			join billing.actions
			on billing.action_staff.action_id = billing.actions.record_id
			where
				billing.action_staff.uid=billing.vgroups.uid
				and billing.action_staff.dtfrom < now()
				and billing.action_staff.dtto > now() limit 1
		)
	) as real_price
FROM billing.vgroups
join billing.accounts using(uid)
join billing.tarifs using(tar_id)
join billing.service_categories using(tar_id)
join billing.agreements using(uid)
join billing.services
on billing.vgroups.vg_id=billing.services.vg_id
where
	billing.vgroups.archive=0
	and billing.vgroups.blocked=0
	and billing.vgroups.acc_ondate like '%-11 00%'
	and billing.service_categories.serv_cat_idx=1
	and balance < if(
						(
							SELECT
								right(billing.actions.name,length(actions.name)-locate('-',actions.name))
							FROM billing.action_staff
							join billing.actions
                            on billing.action_staff.action_id = billing.actions.record_id
							where
								billing.action_staff.uid=billing.vgroups.uid
								and billing.action_staff.dtfrom < now()
								and billing.action_staff.dtto > now() limit 1
						) is null,
						billing.service_categories.above,
						(
							SELECT
								right(billing.actions.name,length(actions.name)-locate('-',actions.name))
							FROM billing.action_staff
							join billing.actions
                            on billing.action_staff.action_id = billing.actions.record_id
							where
								billing.action_staff.uid=billing.vgroups.uid
								and billing.action_staff.dtfrom < now()
								and billing.action_staff.dtto > now() limit 1
						)
					)
	and billing.services.timeto like '%9999-%';
