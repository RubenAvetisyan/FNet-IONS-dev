SELECT billing.gpon_ports.port_id, billing.gpon_ports.vg_id, billing.vgroups.uid, billing.accounts.phone, billing.accounts.mobile, billing.accounts_addr.address
FROM billing.gpon_ports
join   billing.vgroups using(vg_id)
join   billing.accounts using(uid)
join billing.accounts_addr using(uid)
where billing.gpon_ports.port_id=1360 and billing.accounts_addr.type=0;