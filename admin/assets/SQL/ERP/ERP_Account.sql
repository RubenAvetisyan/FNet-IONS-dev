SELECT distinct accounts.uid, accounts.type, 
if(right(trim(accounts.name),1)=' ',right(trim(accounts.name),length(accounts.name)-1),trim(accounts.name)) as name, 
if(left(accounts.mobile,1)='+',right(accounts.mobile,length(accounts.mobile)-1),if(left(accounts.mobile,1)='0',concat('374',right(accounts.mobile,length(accounts.mobile)-1)),if(length(accounts.mobile) <> 0,concat('374',accounts.mobile),ifnull(accounts.mobile,'')))) as mobile, 
if(left(accounts.phone,1)='+',right(accounts.phone,length(accounts.phone)-1),if(left(accounts.phone,1)='0',concat('374',right(accounts.phone,length(accounts.phone)-1)),if(length(accounts.phone) <> 0,concat('374',accounts.phone),ifnull(accounts.phone,'')))) as phone, 
ifnull(accounts.email,'') as email
FROM billing.accounts
left join accounts_addr on accounts.uid=accounts_addr.uid
left join vgroups on accounts.uid=vgroups.uid
left join gpon_ports on vgroups.vg_id=gpon_ports.vg_id left join ports on gpon_ports.port_id=ports.port_id 
left join devices on ports.device_id=devices.device_id 
left join devices_options on ifnull(devices.device_id,11111)=devices_options.device_id and devices_options.name='Agent-Remote-Id'
where accounts_addr.type=0
and devices_options.value='10.130.12.2'
order by uid asc