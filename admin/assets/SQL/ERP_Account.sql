SELECT accounts.uid, accounts.type, accounts.name, accounts.inn, accounts.pass_sernum, accounts.pass_no, accounts.pass_issuedate,
accounts.pass_issuedep, accounts.birthdate, accounts.mobile, accounts.phone, accounts.email, vgroups.vg_id
FROM billing.accounts
left join accounts_addr on accounts.uid=accounts_addr.uid
left join vgroups on accounts.uid=vgroups.uid
left join gpon_ports on vgroups.vg_id=gpon_ports.vg_id left join ports on gpon_ports.port_id=ports.port_id 
left join devices on ports.device_id=devices.device_id 
left join devices_options on ifnull(devices.device_id,11111)=devices_options.device_id and devices_options.name='Agent-Remote-Id'
where accounts_addr.type=0
and devices_options.value='10.130.11.4'
order by block_date desc;