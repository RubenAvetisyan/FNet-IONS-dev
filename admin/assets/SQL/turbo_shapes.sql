SET names utf8;

--
-- Данная процедура записывает в таблицу временной скорости значение
-- на основании таблицы usbox_services
--
DELIMITER ;;
DROP PROCEDURE IF EXISTS set_turbo_shape;;
CREATE PROCEDURE set_turbo_shape(in_serv_id INT, in_duration INT, in_shape INT) MODIFIES SQL DATA
SQL SECURITY INVOKER
BEGIN
        DECLARE vgid int DEFAULT 0;
        DECLARE turbo_mul int DEFAULT 1;
        DECLARE usbox_time datetime DEFAULT 0;
        DECLARE turbo_time datetime DEFAULT 0;
        DECLARE start_time datetime DEFAULT 0;

        SELECT round(`comment`), ifnull(`timefrom`, now()), `mul` INTO vgid, usbox_time, turbo_mul FROM `usbox_services` WHERE `serv_id` = in_serv_id;
        SELECT ifnull(MAX(`timeto`),now()) INTO turbo_time FROM `turbo_shapes` WHERE `vg_id`    = vgid AND timeto > now();
        SET start_time = IF (usbox_time > turbo_time, usbox_time , turbo_time);

        INSERT INTO `turbo_shapes` SET `vg_id` = vgid, `serv_id` = in_serv_id, `timefrom` = start_time, `timeto` = start_time + INTERVAL in_duration * turbo_mul HOUR, `shape` = in_shape;
END;;
DELIMITER ;


--
-- Данная процедура записывает в таблицу временной скорости значение
-- на основании таблицы services
--
DELIMITER ;;
DROP PROCEDURE IF EXISTS set_turbo_shape2;;
CREATE PROCEDURE set_turbo_shape2(in_service_id INT, in_duration INT, in_shape INT) MODIFIES SQL DATA
SQL SECURITY INVOKER
BEGIN
        DECLARE vgid int DEFAULT 0;
        DECLARE turbo_mul int DEFAULT 1;
        DECLARE usbox_time datetime DEFAULT 0;
        DECLARE turbo_time datetime DEFAULT 0;
        DECLARE start_time datetime DEFAULT 0;

        SELECT vg_id, ifnull(`timefrom`, now()), `mul` INTO vgid, usbox_time, turbo_mul FROM `services` WHERE `service_id` = in_service_id;
        SELECT ifnull(MAX(`timeto`),now()) INTO turbo_time FROM `turbo_shapes` WHERE `vg_id` = vgid AND timeto > now();
        SET start_time = IF (usbox_time > turbo_time, usbox_time , turbo_time);

        INSERT INTO `turbo_shapes` SET `vg_id` = vgid, `service_id` = in_service_id, `timefrom` = start_time, `timeto` = start_time + INTERVAL in_duration * turbo_mul HOUR, `shape` = in_shape;
END;;
DELIMITER ;