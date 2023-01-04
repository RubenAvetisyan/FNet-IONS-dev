SELECT tarifs.tar_id, tarifs.descr as name, tarifs.shape, replace(replace(tarifs.descr_full,CHAR(10),''),CHAR(13),'') as descr_full, 
tar_groups_staff.group_id, tar_groups.name as group_name, if(service_categories.above<>0,service_categories.above,tmp1.above) as tar_price
FROM billing.tarifs
left join tar_groups_staff on tarifs.tar_id=tar_groups_staff.tar_id and tar_groups_staff.group_id<>0
left join tar_groups on tar_groups_staff.group_id=tar_groups.group_id
left join service_categories on tarifs.tar_id=service_categories.tar_id and service_categories.serv_cat_idx=1
left join service_categories tmp1 on tarifs.tar_id=tmp1.tar_id and tmp1.serv_cat_idx=2
where tarifs.archive=0 and tarifs.unavailable=0
order by tarifs.descr;