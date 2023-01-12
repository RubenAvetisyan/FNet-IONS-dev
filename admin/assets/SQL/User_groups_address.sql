SELECT 
	group_id, 
	uid, 
	vgroups.login, 
	vgroups.vg_id, 
	-- billing.vgroups_addr.country, 
	-- billing.vgroups_addr.area, 
	-- billing.vgroups_addr.city, 
	-- billing.vgroups_addr.settl, 
	-- billing.vgroups_addr.street, 
	-- billing.vgroups_addr.building, 
-- 	billing.vgroups_addr.entrance, 
-- 	billing.vgroups_addr.floor, 
-- 	billing.vgroups_addr.flat, 
	addr.countrys,
    addr.regions,
    addr.areas,
    addr.citys,
    addr.settls,
    addr.streets,
    addr.buildings,
    addr.bloks,
    addr.flats,
	addr.address
FROM billing.usergroups_staff
join billing.vgroups using(uid)
join (
	select 
		vg_id,
        address,
        mycountry.name as 'countrys',
        if(myregion.short = "обл", myregion.name, "") as 'regions',
        if(myregion.short = "г", myregion.name,myarea.name) as 'areas',
        if(mycity.name is NULL, if(myarea.name is Null, "", myarea.name), mycity.name) as 'citys',
        mysettl.name as 'settls',
        mystreet.name as 'streets',
        if(
			addr.buildings is NULL
			and addr.bloks is NULL
			and addr.flats is NULL,
            mystreet.name,
            mybuilding.name
        ) as 'buildings',
        mybuilding.block as 'bloks',
        myflat.name as 'flats'
	from billing.vgroups_addr
    left join (select record_id as 'country', name from billing.address_country) as mycountry using(country)
    left join (select record_id as 'region', name, short from billing.address_region) as myregion using(region)
    left join (select record_id as 'area', name, region from billing.address_area) as myarea using(region)
    left join (select record_id as 'city', name, region, area from billing.address_city) as mycity using(city)
    left join (select record_id as 'settl', name, region, city, area from billing.address_settl) as mysettl using(settl)
    left join (select record_id as 'street', name, region, city, settl from billing.address_street) as mystreet using(street)
    left join (select record_id as 'building', name, region, city, settl, street, address_building.block as 'block' from billing.address_building) as mybuilding using(building)
    left join (select record_id as 'flat', name, region, building from billing.address_flat) as myflat using(flat)
) as addr using(vg_id)
join billing.agreements using(uid)
where
	group_id in (27,21,16,15,28,13,14,18,17,12,22,20,23,19,11)
    and agreements.date >= '2022-09-01'
    and addr.buildings is NULL
    and addr.bloks is NULL
    and addr.flats is NULL
group by login;