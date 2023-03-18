SELECT distinct billing.groups.name as 'GROUP', count(billing.groups.name) as BLOCK_TOTAL_today, ifnull(yesterday_blocks.QTY,'') as BLOCK_yesterday, 
ifnull(today_blocks.QTY,'') as ADM_yesterday, ifnull(yesterday_pays.QTY,'') as ACTIVE_yesterday, ifnull(yesterday_arch.QTY,'') as ARCHIVE_yestrday
FROM billing.vgroups
join gr_staff on vgroups.vg_id=gr_staff.vg_id 
join billing.groups on gr_staff.group_id=billing.groups.group_id and groups.name <> 'Kineskop' and groups.name <> 'Test' and groups.name <> 'Texapoxvac' and vgroups.blocked=4
left join (SELECT distinct billing.groups.name, count(billing.groups.name) as QTY
FROM billing.vgroups
join gr_staff on vgroups.vg_id=gr_staff.vg_id join billing.groups on gr_staff.group_id=billing.groups.group_id and groups.name <> 'Kineskop' and groups.name <> 'Test' and groups.name <> 'Texapoxvac'
and vgroups.blocked=4 and datediff(date(vgroups.block_date), date(now())) = -1
group by billing.groups.name) yesterday_blocks on billing.groups.name=yesterday_blocks.name
left join (SELECT distinct billing.groups.name, count(billing.groups.name) as QTY
FROM billing.vgroups
join gr_staff on vgroups.vg_id=gr_staff.vg_id join billing.groups on gr_staff.group_id=billing.groups.group_id and groups.name <> 'Kineskop' and groups.name <> 'Test' and groups.name <> 'Texapoxvac'
and vgroups.blocked=3 and datediff(date(vgroups.block_date), date(now())) = -1
group by billing.groups.name) today_blocks on billing.groups.name=today_blocks.name
left join (SELECT distinct billing.groups.name, count(billing.groups.name) as QTY
FROM billing.vg_blocks
join gr_staff on vg_blocks.vg_id=gr_staff.vg_id and vg_blocks.block_type=4 and datediff(date(vg_blocks.timeto), date(now()))=-1 and datediff(date(vg_blocks.timefrom), date(now())) < -1
join billing.groups on gr_staff.group_id=billing.groups.group_id and groups.name <> 'Kineskop' and groups.name <> 'Test' and groups.name <> 'Texapoxvac'
group by billing.groups.name) yesterday_pays on billing.groups.name=yesterday_pays.name
left join (SELECT distinct billing.usergroups.name, count(billing.usergroups.name) as QTY
FROM billing.vgroups
join usergroups_staff on vgroups.uid=usergroups_staff.uid join billing.usergroups on usergroups_staff.group_id=usergroups.group_id and usergroups.name <> 'Test'
and vgroups.archive=1 and datediff(date(vgroups.last_mod_date), date(now()))=-1
group by usergroups.name) yesterday_arch on billing.groups.name=yesterday_arch.name
group by billing.groups.name
order by vgroups.block_date desc
;