SELECT agreements.uid, agreements.agrm_id, number, date as agrm_date, balance, agreements.descr, vgroups.vg_id, vgroups.blocked,
payments.amount, payments.pay_date, payments.receipt, payments.comment, payments.mod_person
FROM billing.agreements
left join vgroups on agreements.uid=vgroups.uid
left join gpon_ports on vgroups.vg_id=gpon_ports.vg_id left join ports on gpon_ports.port_id=ports.port_id 
left join devices on ports.device_id=devices.device_id 
left join devices_options on ifnull(devices.device_id,11111)=devices_options.device_id and devices_options.name='Agent-Remote-Id'
join payments on agreements.agrm_id=payments.agrm_id and datediff(date(payments.pay_date), date(now())) > -1
where (devices_options.value='10.130.6.15' or devices_options.value='10.130.6.16')
order by pay_date desc;