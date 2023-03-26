import { MySQLTypes } from '@/utils/MySQL/field-type'
import { EnumWrapper } from 'ts-enum-util';

export const db = {
    "address_area": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "",
                "description": "код района"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "false",
                "defaultValue": "0",
                "description": "название района"
            },
            "cityid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "-1",
                "description": "код города"
            }
        },
        referenceTables: [
            {
                "thisField": "cityid",
                "tableName": "address_city",
                "field": "id"
            }
        ]
    },
    "address_city": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "false",
                "defaultValue": "0",
                "description": "название города"
            },
            "pos": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "1",
                "description": "номер по порядку при выводе"
            },
            "country_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "1",
                "description": "код страны"
            }
        },
        referenceTables: [
            {
                "thisField": "country_id",
                "tableName": "address_country",
                "field": "id"
            }
        ]
    },
    "address_country": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "идентификатор"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "название"
            }
        },
        referenceTables: []
    },
    "address_house": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "streetid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код улицы"
            },
            "house": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "номер дома"
            },
            "frac": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Varchar30,
                "nullable": "true",
                "defaultValue": "",
                "description": "дробь"
            },
            "amount": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.SmallInt5,
                "nullable": "false",
                "defaultValue": "0",
                "description": "кол-во квартир"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "true",
                "defaultValue": "",
                "description": "комментарий"
            },
            "areaid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код района"
            },
            "quarterid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код квартала"
            },
            "box_index": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar10,
                "nullable": "true",
                "defaultValue": "",
                "description": "почтовый индекс"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата подключения"
            },
            "pod_diapazon": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "",
                "description": "диапазоны подъездов"
            },
            "pod": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "streetid",
                "tableName": "address_street",
                "field": "id (streetid=id)"
            },
            {
                "thisField": "areaid",
                "tableName": "address_area",
                "field": "id (areaid=id)"
            },
            {
                "thisField": "quarterid",
                "tableName": "address_quarter",
                "field": "id (quarterid=id)"
            }
        ]
    },
    "address_quarter": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "false",
                "defaultValue": "0",
                "description": "название квартала"
            },
            "gid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "",
                "description": "обслуживающая группа crm"
            },
            "cityid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "-1",
                "description": "код города"
            }
        },
        referenceTables: [
            {
                "thisField": "cityid",
                "tableName": "address_city",
                "field": "id"
            }
        ]
    },
    "address_street": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "",
                "description": "код"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "false",
                "defaultValue": "0",
                "description": "название улицы"
            },
            "p_index": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar6,
                "nullable": "false",
                "defaultValue": "",
                "description": "индекс улицы"
            },
            "cityid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "-1",
                "description": "код города"
            }
        },
        referenceTables: [
            {
                "thisField": "cityid",
                "tableName": "address_city",
                "field": "id"
            }
        ]
    },
    "bgs_action_group": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "название группы"
            },
            "bgs_action_ids": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": "список id действий"
            }
        },
        referenceTables: []
    },
    "bgs_group": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "название"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "примечание"
            },
            "cgr": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": "маска разрешенных групп договоров"
            },
            "pids": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar512,
                "nullable": "true",
                "defaultValue": "",
                "description": "коды параметров договора и права доступа к ним"
            },
            "opids": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "коды параметров объектов договора и права доступа к ним"
            },
            "cgr_mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "1",
                "description": "режим совпадения групп, 0 - или, 1 - и"
            },
            "menu_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "-1",
                "description": "id меню для этой группы"
            }
        },
        referenceTables: []
    },
    "bgs_group_action": {
        "fields": {
            "gid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код группы"
            },
            "mid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar10,
                "nullable": "false",
                "defaultValue": "",
                "description": "0 - ядро, другое число - код модуля, p{число} - плагин с id равным {число}"
            },
            "aid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код действия"
            }
        },
        referenceTables: [
            {
                "thisField": "gid",
                "tableName": "bgs_group",
                "field": "id (gid=id)"
            }
        ]
    },
    "bgs_group_menu": {
        "fields": {
            "gid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "menu_id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Varchar50,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "hidden": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt2,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: []
    },
    "bgs_module_action": {
        "fields": {
            "module": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "название модуля"
            },
            "data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "false",
                "defaultValue": "",
                "description": "xml с действиями"
            }
        },
        referenceTables: []
    },
    "bgs_query_log_yyyyMM": {
        "fields": {
            "dtime": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "дата и время запроса"
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код пользователя биллинга"
            },
            "ip": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Char40,
                "nullable": "false",
                "defaultValue": "",
                "description": "ip адрес с которого был запрос"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "mid_aid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "склеенная строка <код экземпляра модуля>_<код действия>, для поиска"
            },
            "query": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "",
                "description": "информация по запросу"
            },
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "uid",
                "tableName": "tableId",
                "field": "id"
            }
        ]
    },
    "bgs_user_action": {
        "fields": {
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код пользователя"
            },
            "mid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar10,
                "nullable": "false",
                "defaultValue": "",
                "description": "0-ядро, другое число-код модуля, p{число}-плагин с кодом {число}"
            },
            "aid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код действия"
            },
            "bgs_action_group_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "",
                "description": "id группы действий"
            }
        },
        referenceTables: [
            {
                "thisField": "uid",
                "tableName": "user",
                "field": "id (uid=id)"
            }
        ]
    },
    "bgs_user_group": {
        "fields": {
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код пользователя"
            },
            "gid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код группы"
            }
        },
        referenceTables: [
            {
                "thisField": "uid",
                "tableName": "bgs_group",
                "field": "id (uid=id)"
            },
            {
                "thisField": "gid",
                "tableName": "user",
                "field": "id (gid=id)"
            }
        ]
    },
    "contract": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "gr": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": "битовая маска групп"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "false",
                "defaultValue": "",
                "description": "название договора"
            },
            "pswd": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar32,
                "nullable": "false",
                "defaultValue": "",
                "description": "пароль доступа к статистике"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата начала действия"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания действия"
            },
            "mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": "режим баланса 0 - кредит, 1 - дебет"
            },
            "closesumma": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "лимит"
            },
            "pgid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "группа параметров"
            },
            "pfid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "фирма"
            },
            "fc": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt1,
                "nullable": "false",
                "defaultValue": "0",
                "description": "0 - физ. лицо, 1 - юр. лицо"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "false",
                "defaultValue": "",
                "description": "примечание"
            },
            "del": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt1,
                "nullable": "false",
                "defaultValue": "0",
                "description": "1 - договор скрыт"
            },
            "scid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код супердоговора, 0 - независимый, -1 - супердоговор"
            },
            "sub_list": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "false",
                "defaultValue": "''",
                "description": "список кодов зависимых субдоговоров через запятую"
            },
            "status": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": "статус договора: 0 - подключен, 1 - на отключении, 2 - отключен, 3 - закрыт, 4 - приостановлен, 5 - на подключении"
            },
            "status_date": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата смены статуса договора"
            },
            "last_tariff_change": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата изменения тарифа"
            },
            "title_pattern_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id шаблона комментария"
            },
            "sub_mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": "0 - субдоговор с зависимым балансом, 1 - с независимым."
            },
            "crm_customer_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "domainId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id домена"
            }
        },
        referenceTables: [
            {
                "thisField": "gr",
                "tableName": "contract_group",
                "field": "id (gr=BITMASK(1{{id1| 1{{id2...))"
            },
            {
                "thisField": "pgid",
                "tableName": "contract_parameter_group_name",
                "field": "id (pgid=id)"
            },
            {
                "thisField": "pfid",
                "tableName": "firm",
                "field": "id (pfid=id)"
            },
            {
                "thisField": "title_pattern_id",
                "tableName": "contract_comment_patterns",
                "field": "id"
            },
            {
                "thisField": "domainId",
                "tableName": "domain",
                "field": "id (id домена)"
            }
        ]
    },
    "contract_account": {
        "fields": {
            "yy": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.SmallInt5Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "год"
            },
            "mm": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.TinyInt3Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "месяц с 1"
            },
            "cid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "sid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код услуги"
            },
            "summa": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal15_5,
                "nullable": "true",
                "defaultValue": "",
                "description": "сумма наработки"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "sid",
                "tableName": "service",
                "field": "id (sid=id)"
            }
        ]
    },
    "contract_account_detail": {
        "fields": {
            "contract_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "service_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "entity_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "date_from": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "date_to": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "cost": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal15_2,
                "nullable": "true",
                "defaultValue": "0.00",
                "description": ""
            },
            "amount": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "true",
                "defaultValue": "0.00",
                "description": ""
            },
            "sum": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal15_2,
                "nullable": "true",
                "defaultValue": "0.00",
                "description": ""
            }
        },
        referenceTables: []
    },
    "contract_autopayment": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id записи"
            },
            "contract_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id договора"
            },
            "module_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id модуля"
            },
            "date_from": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Datetime_MariaDB53,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата включения"
            },
            "date_to": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Datetime_MariaDB53,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата отключения"
            },
            "user_from": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "-2",
                "description": "id пользователя включившего возможность автоплатежа для модуля на договоре"
            },
            "user_to": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "-2",
                "description": "id пользователя выключившего возможность автоплатежа для модуля на договоре"
            }
        },
        referenceTables: [
            {
                "thisField": "contract_id",
                "tableName": "contract",
                "field": "id"
            },
            {
                "thisField": "module_id",
                "tableName": "installed_modules",
                "field": "id"
            }
        ]
    },
    "contract_balance": {
        "fields": {
            "yy": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.SmallInt5Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "год"
            },
            "mm": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.TinyInt3Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "месяц (начиная с 1)"
            },
            "cid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "summa1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "входящий остаток на начало месяца"
            },
            "summa2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "приход за месяц"
            },
            "summa3": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "наработка за месяц"
            },
            "summa4": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "расходы за месяц"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            }
        ]
    },
    "contract_charge": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "false",
                "defaultValue": "0000-00-00",
                "description": "дата расхода"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код типа расхода"
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код пользователя"
            },
            "summa": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "сумма"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Char200,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий"
            },
            "lm": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Timestamp,
                "nullable": "false",
                "defaultValue": "current_timestamp()",
                "description": "время изменения записи"
            },
            "payback": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt1,
                "nullable": "false",
                "defaultValue": "0",
                "description": "данное поле различает возврат и расход. возврат - 1, расход - 0"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "pt",
                "tableName": "contract_charge_types",
                "field": "id (pt=id)"
            }
        ]
    },
    "contract_charge_types": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код типа расхода"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Char50,
                "nullable": "false",
                "defaultValue": "",
                "description": "название"
            },
            "flag": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt2,
                "nullable": "false",
                "defaultValue": "0",
                "description": "0 - редактируемый, 1 - нередактируемый"
            },
            "type": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt2,
                "nullable": "false",
                "defaultValue": "0",
                "description": "0 - элемент группы, 1 - группа"
            },
            "up": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "группа-предок в дереве"
            },
            "payback": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt1,
                "nullable": "false",
                "defaultValue": "0",
                "description": "данное поле различает возврат и расход. возврат - 1, расход - 0"
            }
        },
        referenceTables: [
            {
                "thisField": "up",
                "tableName": "contract_charge_types",
                "field": "id (up=id)"
            }
        ]
    },
    "contract_comment": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "cid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код пользователя"
            },
            "subject": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "тема"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "false",
                "defaultValue": "",
                "description": "текст"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Datetime_MariaDB53,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "дата"
            },
            "visibled": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Bit1,
                "nullable": "false",
                "defaultValue": "b'0'",
                "description": "флаг - доступно ли примечание пользователю"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            }
        ]
    },
    "contract_comment_patterns": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar25,
                "nullable": "false",
                "defaultValue": "",
                "description": "название шаблона"
            },
            "pat": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "строка-шаблон"
            }
        },
        referenceTables: []
    },
    "contract_delete_money": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "name": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "название правила"
            },
            "money": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "баланс, менее которого отрабатывает правило"
            },
            "time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "сколько месяцев не было движения по счету"
            },
            "gr": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": "маска групп договоров"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата начала действия правила"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания действия правила"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий"
            },
            "params": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: []
    },
    "contract_delete_time": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код"
            },
            "name": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "название правила"
            },
            "time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "сколько месяцев прошло с момента закрытия договора"
            },
            "gr": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код групп договоров"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата начала действия"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания действия"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий"
            },
            "params": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: []
    },
    "contract_group": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.TinyInt3Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код группы"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "название"
            },
            "enable": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.TinyInt3Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "активна = 1 (отображается в редакторе в договоре)"
            },
            "editable": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt3,
                "nullable": "false",
                "defaultValue": "1",
                "description": "группа редактируема в договоре"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий группы"
            }
        },
        referenceTables: []
    },
    "contract_history_open_log": {
        "fields": {
            "user_id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id пользователя"
            },
            "contract_id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id договора"
            },
            "last_open": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Datetime_MariaDB53,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата и время последнего открытия договора в клиенте биллига данным пользователем"
            }
        },
        referenceTables: [
            {
                "thisField": "user_id",
                "tableName": "user",
                "field": "id (ID пользователя)"
            },
            {
                "thisField": "contract_id",
                "tableName": "contract",
                "field": "id (ID договора)"
            }
        ]
    },
    "contract_label": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id метки"
            },
            "parent_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id родительской метки"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "название метки"
            },
            "type": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.SmallInt6,
                "nullable": "false",
                "defaultValue": "0",
                "description": "тип метки(копия группы или самостоятельная метка)"
            },
            "sort_position": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "позиция для сортировки"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "true",
                "defaultValue": "''",
                "description": "комментарий к метке"
            },
            "forbidden": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "parent_id",
                "tableName": "contract_label",
                "field": "id (ID родительской метки)"
            }
        ]
    },
    "contract_label_link": {
        "fields": {
            "contract_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id договора"
            },
            "label_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id метки"
            }
        },
        referenceTables: [
            {
                "thisField": "contract_id",
                "tableName": "contract",
                "field": "id (ID договора)"
            },
            {
                "thisField": "label_id",
                "tableName": "contract_label",
                "field": "id (id метки)"
            }
        ]
    },
    "contract_limit_manage": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "clp_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "",
                "description": "код задания на возвращение лимита"
            },
            "summ": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "сумма понижения"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Datetime_MariaDB53,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата понижения"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата восстановления"
            },
            "pids": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "true",
                "defaultValue": "",
                "description": "\"платежи восстановления\""
            },
            "rest": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Float10_2,
                "nullable": "false",
                "defaultValue": "0.00",
                "description": "остаток"
            },
            "status": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "0",
                "description": "статус, 0 - \"лимит не погашен\", 1 - \"лимит частично погашен\", 2 - \"лимит погашен\", 3 - \"лимит просрочен.\""
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "clp_id",
                "tableName": "contract_limit_period",
                "field": "id"
            }
        ]
    },
    "contract_limit_manage_mode": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "режим: 0-разблокировано, 1-возможность понижения лимита заблокирована, 2-превышено максимально количество просроченных понижений (заблокировано)"
            },
            "cnt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "кол-во просроченных понижений после последнего разблокирования"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            }
        ]
    },
    "contract_limit_period": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код пользователя"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "dt": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата возвращения"
            },
            "value": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "устанавливаемое значение"
            },
            "status": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar6,
                "nullable": "false",
                "defaultValue": "on",
                "description": "статус"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            }
        ]
    },
    "contract_logon_error": {
        "fields": {
            "lu": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Timestamp,
                "nullable": "false",
                "defaultValue": "current_timestamp()",
                "description": "время последнего обновления записи"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id договора"
            },
            "login": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "логин пользователя"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "время попытки пользователя зайти в личный кабинет"
            },
            "ip": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar40,
                "nullable": "false",
                "defaultValue": "",
                "description": "ip адрес пользователя"
            },
            "error_code": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код ошибки"
            },
            "request_data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "false",
                "defaultValue": "",
                "description": "данные с которыми пользователь пытался зайти в личный кабинет"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "tableId",
                "field": "id"
            }
        ]
    },
    "contract_logon_last": {
        "fields": {
            "lu": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime_MariaDB53,
                "nullable": "false",
                "defaultValue": "current_timestamp()",
                "description": "время последнего обновления записи"
            },
            "cid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id договора"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Datetime_MariaDB53,
                "nullable": "false",
                "defaultValue": "",
                "description": "время последней попытки входа пользователя в личный кабинет"
            },
            "n": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "счетчик попыток входа пользователя в личный кабинет"
            },
            "ip": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar15,
                "nullable": "false",
                "defaultValue": "",
                "description": "ip адрес пользователя"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "tableId",
                "field": "id"
            }
        ]
    },
    "contract_logon_ok": {
        "fields": {
            "lu": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Timestamp,
                "nullable": "false",
                "defaultValue": "current_timestamp()",
                "description": "время последнего обновления записи"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id договора"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "время входа пользователя в личный кабинет"
            },
            "ip": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar40,
                "nullable": "false",
                "defaultValue": "",
                "description": "ip клиента"
            },
            "session_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar32,
                "nullable": "false",
                "defaultValue": "",
                "description": "id сессии"
            },
            "user": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.EnumPCA,
                "nullable": "false",
                "defaultValue": "c",
                "description": "тип пользователя: p - одноразовый вход в личный кабинет c - клиент a - администратор"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "tableId",
                "field": "id"
            }
        ]
    },
    "contract_module": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "mid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код модуля"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id"
            },
            {
                "thisField": "mid",
                "tableName": "module",
                "field": "id"
            }
        ]
    },
    "contract_parameter_group": {
        "fields": {
            "gid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код группы параметров"
            },
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            }
        },
        referenceTables: [
            {
                "thisField": "gid",
                "tableName": "contract_parameter_group_name",
                "field": "id (gid=id)"
            },
            {
                "thisField": "pid",
                "tableName": "contract_parameters_pref",
                "field": "id (pid=id)"
            }
        ]
    },
    "contract_parameter_group_name": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Char150,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            }
        },
        referenceTables: []
    },
    "contract_parameter_type_1": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код парамера"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "значение"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "pid",
                "tableName": "contract_parameters_pref",
                "field": "id (pid=id)"
            }
        ]
    },
    "contract_parameter_type_1_log": {
        "fields": {
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "значение"
            },
            "dt_change": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Datetime_MariaDB53,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата и время изменения"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "кто изменил"
            }
        },
        referenceTables: []
    },
    "contract_parameter_type_2": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "hid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "true",
                "defaultValue": "",
                "description": "код дома"
            },
            "flat": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar10,
                "nullable": "true",
                "defaultValue": "",
                "description": "квартира"
            },
            "room": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar5,
                "nullable": "false",
                "defaultValue": "",
                "description": "комната"
            },
            "pod": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10,
                "nullable": "true",
                "defaultValue": "0",
                "description": "подъезд"
            },
            "floor": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10,
                "nullable": "true",
                "defaultValue": "0",
                "description": "этаж"
            },
            "address": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "тестовая строка с адресом"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "комментарий"
            },
            "format_key": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar50,
                "nullable": "true",
                "defaultValue": "",
                "description": "ключ формата адреса"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "pid",
                "tableName": "contract_parameters_pref",
                "field": "id (pid=id)"
            },
            {
                "thisField": "hid",
                "tableName": "address_house",
                "field": "id (hid=id)"
            }
        ]
    },
    "contract_parameter_type_2_log": {
        "fields": {
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код параметра"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "значение"
            },
            "dt_change": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата изменения"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "кто изменил"
            }
        },
        referenceTables: [
            {
                "thisField": "user_id",
                "tableName": "user",
                "field": "id"
            }
        ]
    },
    "contract_parameter_type_3": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "cid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "email": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar400,
                "nullable": "true",
                "defaultValue": "",
                "description": "email"
            },
            "name": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "поле не используется"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "поле не используется"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "pid",
                "tableName": "contract_parameters_pref",
                "field": "id (pid=id)"
            }
        ]
    },
    "contract_parameter_type_3_log": {
        "fields": {
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код параметра"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "значение"
            },
            "dt_change": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата изменения"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "кто изменил"
            }
        },
        referenceTables: [
            {
                "thisField": "user_id",
                "tableName": "user",
                "field": "id"
            }
        ]
    },
    "contract_parameter_type_3_mail": {
        "fields": {
            "mailid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код рассылки"
            },
            "eid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код e-mail адреса договора"
            }
        },
        referenceTables: [
            {
                "thisField": "mailid",
                "tableName": "mail_list",
                "field": "id (mailid=id)"
            },
            {
                "thisField": "eid",
                "tableName": "contract_parameter_type_3",
                "field": "id (eid=id)"
            }
        ]
    },
    "contract_parameter_type_4": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "val1": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра типа адрес"
            },
            "val2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код обслуживающего лица"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "pid",
                "tableName": "contract_parameters_pref",
                "field": "id (pid=id)"
            },
            {
                "thisField": "val2",
                "tableName": "contract_parameter_type_4_directory",
                "field": "id (val2=id)"
            }
        ]
    },
    "contract_parameter_type_4_directory": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "true",
                "defaultValue": "0",
                "description": "название обслуживающего лица"
            }
        },
        referenceTables: []
    },
    "contract_parameter_type_4_log": {
        "fields": {
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код параметра"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "значение"
            },
            "dt_change": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата изменения"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "кто изменил"
            }
        },
        referenceTables: [
            {
                "thisField": "user_id",
                "tableName": "user",
                "field": "id"
            }
        ]
    },
    "contract_parameter_type_5": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int2,
                "nullable": "false",
                "defaultValue": "0",
                "description": "значение 1 - флаг установлен, 0 - снят"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "pid",
                "tableName": "contract_parameters_pref",
                "field": "id (pid=id)"
            }
        ]
    },
    "contract_parameter_type_5_log": {
        "fields": {
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int2,
                "nullable": "true",
                "defaultValue": "",
                "description": "значение"
            },
            "dt_change": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата изменения"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "кто изменил"
            }
        },
        referenceTables: [
            {
                "thisField": "user_id",
                "tableName": "user",
                "field": "id"
            }
        ]
    },
    "contract_parameter_type_6": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "false",
                "defaultValue": "",
                "description": "значение"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "pid",
                "tableName": "contract_parameters_pref",
                "field": "id (pid=id)"
            }
        ]
    },
    "contract_parameter_type_6_log": {
        "fields": {
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "значение"
            },
            "dt_change": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата изменения"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "кто изменил"
            }
        },
        referenceTables: [
            {
                "thisField": "user_id",
                "tableName": "user",
                "field": "id"
            }
        ]
    },
    "contract_parameter_type_7": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код значения"
            },
            "custom_value": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "пользовательское значение"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "pid",
                "tableName": "contract_parameters_pref",
                "field": "id (pid=id)"
            },
            {
                "thisField": "val",
                "tableName": "contract_parameter_type_7_values",
                "field": "id (val=id)"
            }
        ]
    },
    "contract_parameter_type_7_log": {
        "fields": {
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "",
                "description": "код значения спискового параметра"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "true",
                "defaultValue": "",
                "description": "значение спискового параметра"
            },
            "dt_change": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата изменения"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "кто изменил"
            }
        },
        referenceTables: [
            {
                "thisField": "val",
                "tableName": "contract_parameter_type_7_values",
                "field": "id"
            },
            {
                "thisField": "user_id",
                "tableName": "user",
                "field": "id"
            }
        ]
    },
    "contract_parameter_type_7_values": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код значения"
            },
            "pid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "строка значения"
            }
        },
        referenceTables: []
    },
    "contract_parameter_type_8": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора - значение"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "pid",
                "tableName": "contract_parameters_pref",
                "field": "id (pid=id)"
            },
            {
                "thisField": "val",
                "tableName": "contract",
                "field": "id (val=id)"
            }
        ]
    },
    "contract_parameter_type_8_log": {
        "fields": {
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код параметра"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "",
                "description": "значение"
            },
            "dt_change": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата изменения"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "кто изменил"
            }
        },
        referenceTables: [
            {
                "thisField": "user_id",
                "tableName": "user",
                "field": "id"
            }
        ]
    },
    "contract_parameter_type_multilist": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "код значения"
            },
            "pid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "строка значения"
            }
        },
        referenceTables: []
    },
    "contract_parameter_type_multilist_item": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "pid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код параметра"
            },
            "custom_value": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "пользовательское значение"
            },
            "val": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код значения"
            }
        },
        referenceTables: []
    },
    "contract_parameter_type_multilist_log": {
        "fields": {
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код параметра"
            },
            "dt_change": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата изменения"
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "значение мультиспискового параметра"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "кто изменил"
            }
        },
        referenceTables: []
    },
    "contract_parameter_type_multilist_values": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код значения"
            },
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код параметра"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "строка значения"
            }
        },
        referenceTables: []
    },
    "contract_parameter_type_phone": {
        "fields": {
            "pid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "cid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "value": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: []
    },
    "contract_parameter_type_phone_item": {
        "fields": {
            "pid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код параметра"
            },
            "cid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "n": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "",
                "description": "порядковый номер телефона в списке"
            },
            "phone": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar14,
                "nullable": "true",
                "defaultValue": "",
                "description": "телефонный номер, только цифры без форматирования"
            },
            "format": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar2,
                "nullable": "true",
                "defaultValue": "",
                "description": "формат номера, например: 14 - одна цифра код страны, 4 цифры код города; 32 - три цифры код страны, 2 цифры код города"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "комментарий к номеру"
            }
        },
        referenceTables: [
            {
                "thisField": "pid",
                "tableName": "contract_parameters_pref",
                "field": "id"
            },
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id"
            }
        ]
    },
    "contract_parameter_type_phone_log": {
        "fields": {
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "val": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "dt_change": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: []
    },
    "contract_parameters_pref": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код параметра"
            },
            "pt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "тип параметра (см комментарий таблицы)"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "название параметра"
            },
            "sort": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "порядок в договоре"
            },
            "script": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "false",
                "defaultValue": "",
                "description": "bgs скрипт валидации текстового параметра"
            },
            "lm": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "дата последнего редактирования записи"
            },
            "flags": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt3,
                "nullable": "false",
                "defaultValue": "0",
                "description": "первый бит - ведется ли история праметра (1 - да, 0 - нет); второй бит - права доступа на чтение параметра в лк; третий бит - права доступа на запись параметра в лк"
            },
            "history": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt1,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: []
    },
    "contract_pattern": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "false",
                "defaultValue": "",
                "description": "название"
            },
            "closesumma": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Float,
                "nullable": "false",
                "defaultValue": "0",
                "description": "лимит"
            },
            "tpid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "код тарифного плана"
            },
            "mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "0 - кредит, 1 - дебет"
            },
            "pgid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "группа параметров"
            },
            "pfid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "фирма"
            },
            "fc": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt2,
                "nullable": "false",
                "defaultValue": "0",
                "description": "0 - физ. лицо, 1 - юр. лицо"
            },
            "dtl": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "срок жизни в днях"
            },
            "tgid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "группа тарифов"
            },
            "scrid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "коды скриптов поведения через запятую"
            },
            "name_pattern": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "false",
                "defaultValue": "",
                "description": "шаблон имени"
            },
            "data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Blob,
                "nullable": "true",
                "defaultValue": "",
                "description": "даннные по модулям в шаблоне договора"
            },
            "patid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id шаблона имени"
            },
            "status": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "статус договора при создании"
            },
            "domainId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id домена"
            },
            "contract_groups": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "pgid",
                "tableName": "contract_parameter_group_name",
                "field": "id (pgid=id)"
            },
            {
                "thisField": "pfid",
                "tableName": "firm",
                "field": "id (pfid=id)"
            },
            {
                "thisField": "patid",
                "tableName": "contract_comment_patterns",
                "field": "id"
            },
            {
                "thisField": "domainId",
                "tableName": "domain",
                "field": "id (id домена)"
            }
        ]
    },
    "contract_pattern_modules": {
        "fields": {
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код шаблона договора"
            },
            "mid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код экземпляра модуля"
            }
        },
        referenceTables: [
            {
                "thisField": "pid",
                "tableName": "tableId",
                "field": "id"
            },
            {
                "thisField": "mid",
                "tableName": "tableId",
                "field": "id"
            }
        ]
    },
    "contract_pattern_named_numbers": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код именованного параметра"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar45,
                "nullable": "false",
                "defaultValue": "",
                "description": "название, ключ - по которому идет замена в шаблоне имени"
            },
            "ln": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "последний выданный номер"
            },
            "count_number": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "-1",
                "description": "разряд генерируемого числа, если = -1, то разряд равен сгенированому числу"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar90,
                "nullable": "true",
                "defaultValue": "",
                "description": "описание параметра"
            }
        },
        referenceTables: []
    },
    "contract_pattern_services": {
        "fields": {
            "pid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код шаблона"
            },
            "sid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код услуги"
            }
        },
        referenceTables: [
            {
                "thisField": "pid",
                "tableName": "contract_pattern",
                "field": "id (pid=id)"
            },
            {
                "thisField": "sid",
                "tableName": "service",
                "field": "id (sid=id)"
            }
        ]
    },
    "contract_payment": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "false",
                "defaultValue": "0000-00-00",
                "description": "дата платежа"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "pt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "тип платежа"
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "пользователь"
            },
            "summa": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "сумма"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий к платежу"
            },
            "lm": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Timestamp,
                "nullable": "false",
                "defaultValue": "current_timestamp()",
                "description": "время изменения записи"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "pt",
                "tableName": "contract_payment_types",
                "field": "id (pt=id)"
            }
        ]
    },
    "contract_payment_types": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "",
                "description": "код типа платежа"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar50,
                "nullable": "false",
                "defaultValue": "",
                "description": "название"
            },
            "up": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "группа-предок в дереве"
            },
            "type": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.TinyInt2,
                "nullable": "false",
                "defaultValue": "0",
                "description": "0 - элемент группы, 1 - группа"
            },
            "flag": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.TinyInt2,
                "nullable": "false",
                "defaultValue": "0",
                "description": "0 - редактируемый, 1 - нередактируемый"
            }
        },
        referenceTables: [
            {
                "thisField": "up",
                "tableName": "contract_payment_types",
                "field": "id (up=id)"
            }
        ]
    },
    "contract_reserve": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "",
                "description": "идентификатор"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "typeId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "идентификатор типа резерва"
            },
            "sum": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "сумма"
            },
            "dateCreate": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата создания резерва"
            },
            "dateTo": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата по которую планируется держать резерв"
            },
            "dateClose": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата фактического завершения резерва"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "комментарий"
            }
        },
        referenceTables: []
    },
    "contract_reserve_total": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "sum": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "true",
                "defaultValue": "",
                "description": "сумма всех резервов на договоре"
            }
        },
        referenceTables: []
    },
    "contract_reserve_types": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "идентификатор"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar45,
                "nullable": "false",
                "defaultValue": "",
                "description": "название"
            },
            "used": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt1,
                "nullable": "true",
                "defaultValue": "",
                "description": "1- используется"
            }
        },
        referenceTables: []
    },
    "contract_script": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата начала"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания"
            },
            "script_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код скрипта"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "script_id",
                "tableName": "script",
                "field": "id (script_id=id)"
            }
        ]
    },
    "contract_service": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "cid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "sid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код услуги"
            },
            "date1": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата начала"
            },
            "date2": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий"
            },
            "lm": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "false",
                "defaultValue": "0000-00-00",
                "description": "дата последней правки"
            },
            "eid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "не используется с 4.6"
            },
            "emid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "не используется с 4.6"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "sid",
                "tableName": "service",
                "field": "id (sid=id)"
            }
        ]
    },
    "contract_status_log": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "status": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "",
                "description": "значения статуса"
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id пользователя, сменившего статус(0 - сервер)"
            },
            "date": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата изменения"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "коментарий изменения статуса"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора, к которому относился статус"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата начала статуса"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания статуса"
            }
        },
        referenceTables: [
            {
                "thisField": "uid",
                "tableName": "user",
                "field": "id"
            },
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id"
            }
        ]
    },
    "contract_tariff": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "cid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "tpid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код тарифного плана"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата начала"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий"
            },
            "lm": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": ""
            },
            "pos": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": "позиция тарифа"
            },
            "emid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код экземпляра модуля, к сущности которого привязан тариф. 0 - ядро, т.е. тариф привязан непосредственно к договору."
            },
            "eid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код сущности в экземпляре модуля с кодом emid. для разных модулей сущности разные. телефония - поинты, dialup - логины и т.п."
            },
            "replaced_from": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "",
                "description": "код записи, с которой перешли на эту запись при смена тарифа через web. (не заполняется в случае обработки скриптом)."
            },
            "tariff_group_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "-1",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "tpid",
                "tableName": "tariff_plan",
                "field": "id (tpid=id)"
            },
            {
                "thisField": "emid",
                "tableName": "module",
                "field": "id"
            },
            {
                "thisField": "replaced_from",
                "tableName": "contract_tariff",
                "field": "id"
            }
        ]
    },
    "contract_tariff_group": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "cid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата начала"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания"
            },
            "gid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "группа тарифов"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Char200,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "gid",
                "tableName": "tariff_group",
                "field": "id (gid=id)"
            }
        ]
    },
    "contract_tariff_option": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код активированной тарифной опции"
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "пользователь, активировавший опцию, 0 - клиент, -1 - сервер"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора, на который активирована опция"
            },
            "option_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код опции"
            },
            "time_from": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "время начала действия"
            },
            "time_to": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": "время окончания действия"
            },
            "charge_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код расхода, если есть"
            },
            "summa": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "сумма расхода, если есть"
            },
            "activated_mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "режим активации, которым была активирована опция"
            },
            "activated_time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "время активации опции"
            },
            "deactivated_time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": "время деактивации опции"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id"
            },
            {
                "thisField": "option_id",
                "tableName": "tariff_option",
                "field": "id"
            },
            {
                "thisField": "activated_mode",
                "tableName": "tariff_option_activate_mode",
                "field": "id"
            }
        ]
    },
    "contract_tree_link": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "cid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "tree_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код дерева"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "false",
                "defaultValue": "",
                "description": "название персонального тарифа"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата начала периода"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания периода"
            },
            "pos": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": "позиция персонального тарифа"
            },
            "emid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код экземпляра модуля, к сущности которого привязан тариф. 0 - ядро, т.е. тариф привязан непосредственно к договору."
            },
            "eid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код сущности в экземпляре модуля с кодом emid. для разных модулей сущности разные. телефония - поинты, dialup - логины и т.п."
            },
            "title_web": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "название тарифа в лк"
            },
            "config": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "true",
                "defaultValue": "",
                "description": "конфигурационные параметры тарифа"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            },
            {
                "thisField": "tree_id",
                "tableName": "tariff_tree",
                "field": "id (tree_id=id)"
            },
            {
                "thisField": "emid",
                "tableName": "module",
                "field": "id"
            }
        ]
    },
    "data_log_error_yyyyMM": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "false",
                "defaultValue": "0000-00-00",
                "description": "дата"
            },
            "hh": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": "час"
            },
            "mid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код модуля"
            },
            "source_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код источника"
            },
            "msg_title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "заголовок"
            },
            "msg_data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "",
                "description": "информация об ошибках"
            }
        },
        referenceTables: [
            {
                "thisField": "mid",
                "tableName": "module",
                "field": "id"
            },
            {
                "thisField": "source_id",
                "tableName": "source",
                "field": "id"
            }
        ]
    },
    "domain": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id домена"
            },
            "parentId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id родительского домена"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "false",
                "defaultValue": "",
                "description": "название домена"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "",
                "description": "коментарий"
            }
        },
        referenceTables: [
            {
                "thisField": "parentId",
                "tableName": "domain",
                "field": "id"
            }
        ]
    },
    "firm": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код фирмы"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "false",
                "defaultValue": "0",
                "description": "название"
            }
        },
        referenceTables: []
    },
    "global_script": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код скрипта"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "название скрипта"
            },
            "script": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "true",
                "defaultValue": "",
                "description": "тело скрипта"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "пользователь - автор изменений"
            },
            "change_time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime_MariaDB53,
                "nullable": "false",
                "defaultValue": "current_timestamp()",
                "description": "время последнего изменения"
            }
        },
        referenceTables: [
            {
                "thisField": "user_id",
                "tableName": "user",
                "field": "id"
            }
        ]
    },
    "installed_modules": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id"
            },
            "name": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "true",
                "defaultValue": "0",
                "description": "имя модуля"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "true",
                "defaultValue": "0",
                "description": "название"
            },
            "version": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar20,
                "nullable": "true",
                "defaultValue": "0",
                "description": "версия"
            },
            "pack_server": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "true",
                "defaultValue": "0",
                "description": "пакет сервера"
            },
            "pack_client": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "true",
                "defaultValue": "0",
                "description": "пакет клиента"
            },
            "type": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar20,
                "nullable": "false",
                "defaultValue": "0",
                "description": "тип модуля"
            },
            "client_zip": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongBlob,
                "nullable": "false",
                "defaultValue": "",
                "description": "клиентская библиотека (забирается клиентом при подключении)"
            },
            "init": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "false",
                "defaultValue": "",
                "description": "скрипт инициализации"
            },
            "enabled": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt1,
                "nullable": "false",
                "defaultValue": "0",
                "description": "1 - плагин активен"
            },
            "uninstall": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "true",
                "defaultValue": "",
                "description": "скрипт деинсталляции"
            }
        },
        referenceTables: []
    },
    "inv_product": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id активированного продукта"
            },
            "contractId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id договора"
            },
            "accountId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id аккаунта (модуля)"
            },
            "productSpecId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id (описания) продукта"
            },
            "timeFrom": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "время начала действия"
            },
            "timeTo": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": "время окончания действия"
            },
            "activationModeId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "выбранный режим активации"
            },
            "activationTime": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "время активации"
            },
            "activationPrice": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_5,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "deactivationTime": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": "время деактивации"
            },
            "userId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id пользователя"
            },
            "deviceProductId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "true",
                "defaultValue": "",
                "description": "внешний id активированного продукта"
            },
            "deviceState": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "",
                "description": "внешнее состояние продукта (1-вкл,0-отк)"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий"
            },
            "description": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "описание"
            }
        },
        referenceTables: [
            {
                "thisField": "contractId",
                "tableName": "contract",
                "field": "id (привязка к договору)"
            },
            {
                "thisField": "productSpecId",
                "tableName": "inv_product_spec",
                "field": "id (привязка к продукту)"
            },
            {
                "thisField": "activationModeId",
                "tableName": "inv_product_spec_activation_mode",
                "field": "id"
            }
        ]
    },
    "inv_product_period": {
        "fields": {
            "id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "",
                "description": "id периода"
            },
            "contractId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id договора"
            },
            "accountId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id аккаунта (модуля)"
            },
            "productSpecId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id описания продукта"
            },
            "productId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id (активированного) продукта"
            },
            "activationTime": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Datetime_MariaDB53,
                "nullable": "false",
                "defaultValue": "",
                "description": "время активации"
            },
            "timeFrom": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Datetime_MariaDB53,
                "nullable": "false",
                "defaultValue": "",
                "description": "время начала действия периода"
            },
            "timeTo": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Datetime_MariaDB53,
                "nullable": "true",
                "defaultValue": "",
                "description": "время окончания действия (может продлеваться)"
            },
            "prolongationTime": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Datetime_MariaDB53,
                "nullable": "false",
                "defaultValue": "",
                "description": "время последнего продления"
            },
            "flags": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "системные флаги"
            },
            "version": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "версия записи"
            }
        },
        referenceTables: [
            {
                "thisField": "contractId",
                "tableName": "contract",
                "field": "id"
            },
            {
                "thisField": "productSpecId",
                "tableName": "inv_product_spec",
                "field": "id"
            },
            {
                "thisField": "productId",
                "tableName": "inv_product",
                "field": "id"
            }
        ]
    },
    "inv_product_spec": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "entityId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "привязка к сущности (атрибутам)"
            },
            "moduleId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "parentId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id родительского продукта"
            },
            "periodic": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "1",
                "description": "периодичный продукт (1, по умолчанию) или временный (0)"
            },
            "notRealtime": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": "в реальном времени (0, по умолчанию) или нет (1), т.е. по планировщику"
            },
            "priority": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "приоритет продукта при продлении: больше - важнее (при условии что продляются в одно и то же время одновременно)"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "название продукта"
            },
            "identifier": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "внешний идентификатор продукта (например, id пакета в mw)"
            },
            "tariffIds": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar1024,
                "nullable": "true",
                "defaultValue": "",
                "description": "id разрешенных тарифов"
            },
            "contractGroups": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar1024,
                "nullable": "true",
                "defaultValue": "",
                "description": "id разрешенных групп договоров"
            },
            "depends": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar1024,
                "nullable": "true",
                "defaultValue": "",
                "description": "id продуктов, от которых зависит данный"
            },
            "incompatible": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar1024,
                "nullable": "true",
                "defaultValue": "",
                "description": "id продуктов, с которыми данный не совместим"
            },
            "activationModeIds": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "dateFrom": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата начала действия"
            },
            "dateTo": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания действия"
            },
            "status": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "hideForCustomer": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "hideForContractGroups": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "hideForContractGroupsMode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "activationByCustomer": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "deactivationByCustomer": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий"
            },
            "description": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "false",
                "defaultValue": "",
                "description": "описание"
            },
            "data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": ""
            },
            "contractLabels": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": ""
            },
            "hideForContractLabels": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": ""
            }
        },
        referenceTables: []
    },
    "inv_product_spec_activation_mode": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "productSpecId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id (описания) продукта"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "true",
                "defaultValue": "",
                "description": "название режима активации"
            },
            "dateFrom": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата начала действия"
            },
            "dateTo": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания действия"
            },
            "periodMode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "periodAmount": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "deactivationMode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "reactivationMode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "chargeTypeId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "chargeAmount": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_0,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "productSpecId",
                "tableName": "inv_product_spec",
                "field": "id"
            }
        ]
    },
    "log_contract_face": {
        "fields": {
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "дата изменения параметра"
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id- пользователя, который изменил параметр"
            },
            "value": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "значение параметра. 0 - физ лицо, 1 - юр лицо"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id-договора, в котором изменился параметр"
            }
        },
        referenceTables: []
    },
    "log_contract_limit": {
        "fields": {
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "время"
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код пользователя"
            },
            "nvalue": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "новое значение"
            },
            "cid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "примечание"
            },
            "days": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar4,
                "nullable": "true",
                "defaultValue": "",
                "description": "на сколько дней понижение"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            }
        ]
    },
    "log_contract_limit_manage_mode": {
        "fields": {
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": ""
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "uid",
                "tableName": "tableId",
                "field": "id"
            }
        ]
    },
    "log_contract_mode": {
        "fields": {
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "время"
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код пользователя"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "value": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код нового режима (0-кредит, 1-дебет)"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            }
        ]
    },
    "log_contract_pswd": {
        "fields": {
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "время"
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код пользователя"
            },
            "cid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            }
        ]
    },
    "log_function_process_yyyyMM": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "cid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "время"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "название обработавшей функции"
            },
            "data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "",
                "description": "вывод функции"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            }
        ]
    },
    "log_gscript_process_yyyyMM": {
        "fields": {
            "time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата и время"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "название скрипта"
            },
            "data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "false",
                "defaultValue": "",
                "description": "лог"
            }
        },
        referenceTables: []
    },
    "log_login_pswd": {
        "fields": {
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": ""
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "mid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "lid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            }
        },
        referenceTables: []
    },
    "mail_list": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar50,
                "nullable": "true",
                "defaultValue": "0",
                "description": "название рассылки"
            },
            "flag": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int1Unsigned,
                "nullable": "true",
                "defaultValue": "0",
                "description": "0 - редактируемый, 1 - нередактируемый (для совместимости с редактором, не используется в работе)"
            },
            "type": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt1Unsigned,
                "nullable": "true",
                "defaultValue": "0",
                "description": "0 - элемент группы, 1 - группа"
            },
            "up": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11Unsigned,
                "nullable": "true",
                "defaultValue": "0",
                "description": "код узла предка (для оформления в справочнике)"
            }
        },
        referenceTables: [
            {
                "thisField": "up",
                "tableName": "mail_list",
                "field": "id (up=id)"
            }
        ]
    },
    "mail_list_message": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "subject": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "тема сообщения"
            },
            "text": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "true",
                "defaultValue": "",
                "description": "текст сообщения"
            }
        },
        referenceTables: []
    },
    "mail_temp": {
        "fields": {
            "id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "eid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "id",
                "tableName": "mail_list_message",
                "field": "id (id=id)"
            },
            {
                "thisField": "eid",
                "tableName": "mail_list",
                "field": "id (eid=id)"
            }
        ]
    },
    "message_for_users": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id сообщения"
            },
            "date_from": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "с какой даты показывать сообщение"
            },
            "date_to": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "по какую дату показывать сообщение"
            },
            "text": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "false",
                "defaultValue": "",
                "description": "текст сообщения"
            },
            "gr": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "группы пользователей биллинга, которым показывать сообщение"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "заголовок сообщения"
            },
            "users": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "пользователи биллинга, которым показывать сообщение"
            }
        },
        referenceTables: []
    },
    "module": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код модуля"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "false",
                "defaultValue": "",
                "description": "название модуля"
            },
            "name": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar16,
                "nullable": "false",
                "defaultValue": "",
                "description": "имя модуля"
            }
        },
        referenceTables: [
            {
                "thisField": "name",
                "tableName": "installed_modules",
                "field": "id (name=name)"
            }
        ]
    },
    "module_config": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код конфигурации"
            },
            "mid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int3Unsigned,
                "nullable": "true",
                "defaultValue": "0",
                "description": "код модуля"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "дата"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "false",
                "defaultValue": "0",
                "description": "название"
            },
            "active": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt3Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "признак активности - 1"
            },
            "uid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11Unsigned,
                "nullable": "true",
                "defaultValue": "0",
                "description": "код пользователя"
            },
            "config": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "true",
                "defaultValue": "",
                "description": "текст конфигурации"
            }
        },
        referenceTables: []
    },
    "module_tariff_tree": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "",
                "description": "код модульного дерева"
            },
            "mid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код модуля"
            },
            "tree_id": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код дерева"
            },
            "parent_tree": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код дерева - предка"
            },
            "lm": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "mid",
                "tableName": "module",
                "field": "id (mid=id)"
            },
            {
                "thisField": "tree_id",
                "tableName": "tariff_tree",
                "field": "id (tree_id=id)"
            },
            {
                "thisField": "parent_tree",
                "tableName": "tariff_tree",
                "field": "id (parent_tree=id)"
            }
        ]
    },
    "mtree_node": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код узла"
            },
            "parent_node": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код узла-предка"
            },
            "mtree_id": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код модульного дерева"
            },
            "type": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar20,
                "nullable": "false",
                "defaultValue": "",
                "description": "строка с типом узла"
            },
            "data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "false",
                "defaultValue": "",
                "description": "данные"
            },
            "pos": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "позиция узла в родительском (нумерация начинается с 0)"
            }
        },
        referenceTables: [
            {
                "thisField": "mtree_id",
                "tableName": "module_tariff_tree",
                "field": "id (mtree_id=id)"
            }
        ]
    },
    "payment_register": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "уникальный идентификатор записи"
            },
            "date": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата реестра"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "false",
                "defaultValue": "",
                "description": "название реестра"
            },
            "pt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "тип платежа реестра"
            },
            "load_time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": "время загрузки"
            },
            "count": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int3,
                "nullable": "false",
                "defaultValue": "0",
                "description": "количество корректных платежей"
            },
            "summa": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "0.00",
                "description": "сумма корректных платежей"
            },
            "processed": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt2,
                "nullable": "false",
                "defaultValue": "0",
                "description": "1 - реестр проведен"
            },
            "process_time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": "время проведения"
            },
            "load_log": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "false",
                "defaultValue": "",
                "description": "лог загрузки"
            },
            "ptitle": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar50,
                "nullable": "false",
                "defaultValue": "",
                "description": "имя шаблона , по которму был загружен реестр"
            },
            "regtype": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "тип реестра(1 - расходы, 0 - платежи)"
            },
            "errorCount": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            }
        },
        referenceTables: []
    },
    "payment_register_item_yyyyMM": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "уникальный идентификатор записи"
            },
            "rid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "0",
                "description": "ссылка на реестр"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "0",
                "description": "код договора"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата платежа"
            },
            "pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "0",
                "description": "код записи в таблице платежей"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "true",
                "defaultValue": "",
                "description": "комментарий платежа"
            },
            "unique_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar60,
                "nullable": "false",
                "defaultValue": "",
                "description": "уникальный идентификатор платежа в пределах месяца"
            },
            "ptid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "0",
                "description": "тип платежа для данной записи"
            },
            "summa": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "true",
                "defaultValue": "0.00",
                "description": "сумма"
            }
        },
        referenceTables: [
            {
                "thisField": "rid",
                "tableName": "payment_register",
                "field": "id"
            },
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id"
            },
            {
                "thisField": "pid",
                "tableName": "contract_payment",
                "field": "id"
            },
            {
                "thisField": "ptid",
                "tableName": "contract_payment_types",
                "field": "id"
            }
        ]
    },
    "periodic_errors": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "идентификатор"
            },
            "marker": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "маркер, определяющий переобсчет"
            },
            "calc_date": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "месяц, за который производился переобсчет"
            },
            "subject": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "заголовок лога"
            },
            "text": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "true",
                "defaultValue": "",
                "description": "описание ошибок"
            },
            "reg_time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата регистрации ошибки (проведения переобсчета)"
            }
        },
        referenceTables: []
    },
    "permission_kit": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar300,
                "nullable": "false",
                "defaultValue": "",
                "description": "название набора"
            },
            "contract_labels": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": "список разрешённых меток договора"
            },
            "domens": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": "список разрешённых доменов"
            },
            "bgs_action_ids": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": "список разрешённых id действий"
            },
            "bgs_group_action_ids": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": "список разрешённых id групп действий"
            },
            "pids": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar512,
                "nullable": "false",
                "defaultValue": "",
                "description": "список параметров договора"
            },
            "contract_objects": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "список объектов договора"
            },
            "description": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": "описание набора"
            }
        },
        referenceTables: []
    },
    "plugin_config": {
        "fields": {
            "pid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код плагина"
            },
            "config": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "true",
                "defaultValue": "",
                "description": "конфигурация плагина"
            }
        },
        referenceTables: [
            {
                "thisField": "pid",
                "tableName": "installed_modules",
                "field": "id (pid=id)"
            }
        ]
    },
    "role": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar300,
                "nullable": "false",
                "defaultValue": "",
                "description": "название роли"
            },
            "menu_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "id меню для данной роли"
            },
            "childs": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": "список id дочерних ролей через запятую"
            },
            "permission_kit_ids": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "0",
                "description": "список id наборов ограничений"
            }
        },
        referenceTables: []
    },
    "scheduled_class": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "true",
                "defaultValue": "",
                "description": "название задачи"
            },
            "class": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar240,
                "nullable": "true",
                "defaultValue": "",
                "description": "имя java класса"
            }
        },
        referenceTables: []
    },
    "scheduled_periodic_run": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код периодической задачи"
            },
            "description": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "true",
                "defaultValue": "",
                "description": "описание выполняемой задачи"
            },
            "amount": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "0",
                "description": "количество одновременно выполняемых задач"
            }
        },
        referenceTables: []
    },
    "scheduled_task_log": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "task_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код задачи планировщика"
            },
            "task_title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar128,
                "nullable": "true",
                "defaultValue": "",
                "description": "название задачи"
            },
            "start": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата/время начала выполнения задачи в виде unix_time"
            },
            "finish": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "",
                "description": "дата/время окончания выполнения задачи в виде unix_time"
            }
        },
        referenceTables: [
            {
                "thisField": "task_id",
                "tableName": "scheduled_tasks",
                "field": "id (Код задачи планировщика)"
            }
        ]
    },
    "scheduled_task_run": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongBlob,
                "nullable": "true",
                "defaultValue": "",
                "description": "сериализованный объект, содержащий класс - задание"
            },
            "description": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "executed": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt2,
                "nullable": "true",
                "defaultValue": "0",
                "description": ""
            },
            "start_time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: []
    },
    "scheduled_tasks": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "mm": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": "битовая маска месяцев, с младшего бита"
            },
            "dm": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "битовая маска дней месяца"
            },
            "dw": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": "битовая маска дней недели"
            },
            "hh": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "0",
                "description": "битовая маска часов"
            },
            "min": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": "битовая маска минут"
            },
            "prior": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "приоритет задания"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "с какой даты выполнять задачу"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "по какую дату выполнять задачу"
            },
            "status": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": "текущий статус задачи, 1 - активна"
            },
            "class_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код класса"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий"
            },
            "params": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "false",
                "defaultValue": "",
                "description": "конфигурация задачи"
            },
            "class": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "module_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "class_id",
                "tableName": "scheduled_class",
                "field": "id (Класс задачи)"
            }
        ]
    },
    "script": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "название"
            }
        },
        referenceTables: []
    },
    "script_backup": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код резервной копии"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "комментарий к резервной копии скрипта"
            },
            "script_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id скрипта"
            },
            "script": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "true",
                "defaultValue": "",
                "description": "текст скрипта"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id пользователя"
            },
            "change_time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Timestamp,
                "nullable": "false",
                "defaultValue": "current_timestamp()",
                "description": "время создания резервной копии"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "коментарий"
            },
            "type": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "",
                "description": "тип резервной копии : 0 - копия глобального скрипта,1-код функции, 2- код библиотеки"
            }
        },
        referenceTables: [
            {
                "thisField": "user_id",
                "tableName": "user",
                "field": "id"
            }
        ]
    },
    "script_classes": {
        "fields": {
            "name": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "имя класса с пакетом"
            },
            "last_mod": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "",
                "description": "время последнего изменения"
            },
            "data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumBlob,
                "nullable": "false",
                "defaultValue": "",
                "description": "тело .class файла"
            }
        },
        referenceTables: []
    },
    "script_classes_ifaces": {
        "fields": {
            "name": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "наименование класса"
            },
            "iface": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "наименование интерфейса"
            }
        },
        referenceTables: []
    },
    "script_custom_template": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "true",
                "defaultValue": "",
                "description": "название шаблона"
            },
            "create_date": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата создания"
            },
            "date_last_mod": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата последнего изменения"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "id пользователя вносившего изменения"
            },
            "template_data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "true",
                "defaultValue": "",
                "description": "данные самого шаблона(код, текст)"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar256,
                "nullable": "true",
                "defaultValue": "",
                "description": "комментарий"
            },
            "extension": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar10,
                "nullable": "true",
                "defaultValue": "",
                "description": "расширение"
            }
        },
        referenceTables: []
    },
    "script_event_queue": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "event": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongBlob,
                "nullable": "false",
                "defaultValue": "",
                "description": "сериализованный java класс с событием"
            }
        },
        referenceTables: []
    },
    "script_event_type": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "mid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "0 - ядро, другое число - код модуля, p{число} - плагин с кодом {число}"
            },
            "event_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код типа события для старых событий либо название класса-события для новых"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "false",
                "defaultValue": "",
                "description": "название типа события"
            },
            "event_mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "1",
                "description": "тип события (1-привязано к договору, 0 - глобальное)"
            }
        },
        referenceTables: []
    },
    "script_function": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код функции"
            },
            "script_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код скрипта"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "название функции"
            },
            "code": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "true",
                "defaultValue": "",
                "description": "текст программы"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "пользователь - автор изменений"
            },
            "change_time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Timestamp,
                "nullable": "false",
                "defaultValue": "current_timestamp()",
                "description": "время последнего изменения"
            }
        },
        referenceTables: [
            {
                "thisField": "script_id",
                "tableName": "script",
                "field": "id (script_id=id)"
            },
            {
                "thisField": "user_id",
                "tableName": "user",
                "field": "id"
            }
        ]
    },
    "script_function_event_type": {
        "fields": {
            "fid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код функции"
            },
            "mid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "0 - ядро, другое число - код модуля, p{число} - плагин с кодом {число}"
            },
            "event_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код типа события"
            }
        },
        referenceTables: [
            {
                "thisField": "fid",
                "tableName": "script_function",
                "field": "id (fid=id)"
            },
            {
                "thisField": "mid",
                "tableName": "script_event_type",
                "field": "id (mid=mid \\+ event_id=event_id)"
            }
        ]
    },
    "script_lib": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "name": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": "имя библиотеки"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "описание библиотеки"
            },
            "script": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.MediumText,
                "nullable": "false",
                "defaultValue": "",
                "description": "код библиотеки"
            },
            "user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "пользователь - автор изменений"
            },
            "change_time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Timestamp,
                "nullable": "false",
                "defaultValue": "current_timestamp()",
                "description": "время последнего изменения"
            }
        },
        referenceTables: [
            {
                "thisField": "user_id",
                "tableName": "user",
                "field": "id"
            }
        ]
    },
    "sequential_ids": {
        "fields": {
            "mid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Varchar8,
                "nullable": "false",
                "defaultValue": "",
                "description": "ид модуля/плагина"
            },
            "value": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "",
                "description": "значение идентификатора"
            }
        },
        referenceTables: []
    },
    "service": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код услуги"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "название услуги"
            },
            "mid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код модуля"
            },
            "lm": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "дата и время последнего изменения"
            },
            "isusing": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt1,
                "nullable": "true",
                "defaultValue": "1",
                "description": "признак используемости услуги"
            },
            "parentId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "dateFrom": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "dateTo": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "description": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "unit": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "config": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": ""
            },
            "active_date_from": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "active_date_to": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "mid",
                "tableName": "module",
                "field": "id (mid=id)"
            }
        ]
    },
    "setup": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Varchar100,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "value": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: []
    },
    "source": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "mid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код модуля"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar20,
                "nullable": "false",
                "defaultValue": "",
                "description": "название"
            },
            "date1": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "date2": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий"
            },
            "source_type": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": "тип 1 - ftp, 2 - локальная или сетевая папка, 3 - netflow"
            },
            "host_or_dir": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "хост или путь к папке в зависимости от типа"
            },
            "user": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar15,
                "nullable": "false",
                "defaultValue": "",
                "description": "пользователь ftp"
            },
            "pswd": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar15,
                "nullable": "false",
                "defaultValue": "",
                "description": "пароль ftp"
            },
            "config": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "lm": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Datetime_MariaDB53,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": ""
            }
        },
        referenceTables: []
    },
    "source_data_yyyyMM": {
        "fields": {
            "source_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код источника"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "дата и час лога"
            },
            "size": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": "размер файла лога"
            },
            "modtime": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": "время модификации файла лога"
            },
            "process": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": "пометка о обработке"
            }
        },
        referenceTables: [
            {
                "thisField": "source_id",
                "tableName": "source",
                "field": "id (source_id=id)"
            }
        ]
    },
    "sql_patches_history": {
        "fields": {
            "mid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Varchar10,
                "nullable": "false",
                "defaultValue": "",
                "description": "код модуля, 0 - ядро, <целое_число> - для плагинов или модулей в целом (таблица installed_module), m<целое_число> - для конкретных реализаций модуля (из таблицы module)"
            },
            "versions": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "true",
                "defaultValue": "",
                "description": "md5 хэши выполненных запросов"
            }
        },
        referenceTables: [
            {
                "thisField": "mid",
                "tableName": "installed_modules",
                "field": "id" // (плагин или модуль)\nkernel
            }
        ]
    },
    "tariff_group": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "false",
                "defaultValue": "",
                "description": "название"
            },
            "tm": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt3,
                "nullable": "false",
                "defaultValue": "0",
                "description": "с каких моментов можно переходить (1-любой день, 2-неделя, 3-начало месяца, 4-любой день, начиная со следующего)"
            },
            "df": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "на сколько раз вперед от первой подходящей даты можно выставить задания"
            },
            "pos": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "позиция планов данной группы в договоре"
            },
            "beh": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "domain_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            }
        },
        referenceTables: []
    },
    "tariff_group_tariff": {
        "fields": {
            "tgid": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код группы тарифов"
            },
            "tpid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код тарифного плана"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "начало периода видимости тарифа в группе тарифов"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "конец периода видимости тарифа в группе тарифов"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar500,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "tgid",
                "tableName": "tariff_group",
                "field": "id (tgid=id)"
            },
            {
                "thisField": "tpid",
                "tableName": "tariff_plan",
                "field": "id (tpid=id)"
            }
        ]
    },
    "tariff_label": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код метки"
            },
            "parent_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код родительской метки"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "название метки"
            }
        },
        referenceTables: [
            {
                "thisField": "parent_id",
                "tableName": "tariff_label",
                "field": "id"
            }
        ]
    },
    "tariff_label_link": {
        "fields": {
            "tariff_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код тарифа"
            },
            "label_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код тарифной метки"
            }
        },
        referenceTables: [
            {
                "thisField": "tariff_id",
                "tableName": "tariff_plan",
                "field": "id"
            },
            {
                "thisField": "label_id",
                "tableName": "tariff_label",
                "field": "id"
            }
        ]
    },
    "tariff_option": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код тарифной опции"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar250,
                "nullable": "false",
                "defaultValue": "",
                "description": "название"
            },
            "tariff_ids": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "false",
                "defaultValue": "",
                "description": "коды тарифов, для которых возможна активация"
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "false",
                "defaultValue": "",
                "description": "комментарий"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата начала возможности активации"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания возможности активации"
            },
            "depends": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "коды опций, которые должны быть активированы для активации данной"
            },
            "incompatible": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "коды опции, при наличии активированных которых, активация данной невозможна"
            },
            "deactivation_mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "режим деактивации"
            },
            "contract_groups": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": "группы договоров, для которых возможна активация опции"
            },
            "description": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "hideForWeb": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.SmallInt6,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "hideForWebContractGroups": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "hideForWebContractGroupsMode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.SmallInt6,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "contract_labels": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": ""
            },
            "hide_for_web_contract_labels": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "''",
                "description": ""
            }
        },
        referenceTables: []
    },
    "tariff_option_activate_mode": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код режима активации"
            },
            "option_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код тарифной опции"
            },
            "charge_type_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код типа расхода"
            },
            "charge_summa": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Decimal10_2,
                "nullable": "false",
                "defaultValue": "",
                "description": "сумма расхода"
            },
            "period_mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "режим периода активации"
            },
            "period_col": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "количество периода активации (часов/дней/недель/месяцев)"
            },
            "date1": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата начала возможности активации"
            },
            "date2": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "true",
                "defaultValue": "",
                "description": "дата окончания возможности активации"
            },
            "deactivation_mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "режим деактивации"
            },
            "reactivation_mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "режим реактивации"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "delete_mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "delete_charge_mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "1",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "option_id",
                "tableName": "tariff_option",
                "field": "id"
            },
            {
                "thisField": "charge_type_id",
                "tableName": "contract_charge_types",
                "field": "id"
            }
        ]
    },
    "tariff_plan": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код тарифного плана"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar200,
                "nullable": "false",
                "defaultValue": "",
                "description": "название тарифного плана"
            },
            "title_web": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "название тарифного плана в лк"
            },
            "actual": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "флаг используется\\не используется"
            },
            "gr": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "",
                "description": "битовая маска групп для фильтра по договору"
            },
            "pattern": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "шаблон имени договора для фильтра по договору"
            },
            "face": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "true",
                "defaultValue": "",
                "description": "для лиц: 0 - любых, 1 - физических, 2 - юридических"
            },
            "tree_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код тарифного дерева"
            },
            "config": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "true",
                "defaultValue": "",
                "description": "конфигурационные параметры тарифа"
            },
            "lm": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": ""
            },
            "comment": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar500,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            },
            "contract_label_ids": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "tree_id",
                "tableName": "tariff_tree",
                "field": "id"
            }
        ]
    },
    "tariff_tree": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10,
                "nullable": "false",
                "defaultValue": "",
                "description": "код дерева"
            },
            "parent_tree": {
                "PK": false,
                "IX": true,
                "type": MySQLTypes.Int3,
                "nullable": "false",
                "defaultValue": "0",
                "description": "устаревшая колонка (код дерева-предка)"
            }
        },
        referenceTables: []
    },
    "tariff_tree_config": {
        "fields": {
            "module": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Varchar20,
                "nullable": "false",
                "defaultValue": "0",
                "description": "название модуля"
            },
            "data": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "false",
                "defaultValue": "",
                "description": "xml конфигурация тарифного дерева"
            }
        },
        referenceTables: []
    },
    "task_load": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": "код записи"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "дата и час лога"
            },
            "param": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код источника"
            },
            "count": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "0",
                "description": "количество попыток загрузки"
            },
            "le": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "время последней попытки"
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Char200,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "param",
                "tableName": "source",
                "field": "id (param=id)"
            }
        ]
    },
    "task_proccess": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int10Unsigned,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Char200,
                "nullable": "false",
                "defaultValue": "",
                "description": "название"
            },
            "mid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код модуля"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "дата и час лога"
            },
            "param": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код источника"
            },
            "start_process_time": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "true",
                "defaultValue": "",
                "description": "время начала обработки"
            }
        },
        referenceTables: [
            {
                "thisField": "param",
                "tableName": "source",
                "field": "id (param=id)"
            }
        ]
    },
    "user": {
        "fields": {
            "id": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код"
            },
            "login": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Char15,
                "nullable": "false",
                "defaultValue": "",
                "description": "логин"
            },
            "name": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Char50,
                "nullable": "false",
                "defaultValue": "",
                "description": "имя"
            },
            "email": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Char50,
                "nullable": "false",
                "defaultValue": "",
                "description": "адрес электронной почты"
            },
            "descr": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Char255,
                "nullable": "false",
                "defaultValue": "",
                "description": "описание"
            },
            "pswd": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Char32,
                "nullable": "true",
                "defaultValue": "",
                "description": "пароль"
            },
            "dt": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "дата заведения"
            },
            "cgr": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "0",
                "description": "маска разрешенных групп договоров"
            },
            "cgr_mode": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "1",
                "description": "режим совпадения групп договоров. 0 - или, 1 - и."
            },
            "status": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt4,
                "nullable": "false",
                "defaultValue": "0",
                "description": "статус (0-активен, 1-заблокирован)"
            },
            "pids": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar512,
                "nullable": "true",
                "defaultValue": "",
                "description": "коды параметров договора и права доступа к ним"
            },
            "opids": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "true",
                "defaultValue": "",
                "description": "коды параметров объектов договора и права доступа к ним"
            },
            "contract_pid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "привязка к договору: код типа параметра \"ссылка на договор\""
            },
            "contract_cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "привязка к договору: код договора"
            },
            "gr": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.BigInt20,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "config": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "crm_user_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "ch_pswd": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt2,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            },
            "domainIds": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar255,
                "nullable": "false",
                "defaultValue": "",
                "description": "id доменов"
            },
            "personal_action": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "количество персональных разрешений пользователя"
            },
            "menu_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "-1",
                "description": ""
            },
            "role_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": ""
            }
        },
        referenceTables: [
            {
                "thisField": "role_id",
                "tableName": "role",
                "field": "id"
            }
        ]
    },
    "user_menu": {
        "fields": {
            "uid": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "menu_id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Varchar50,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "hidden": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.TinyInt2,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            }
        },
        referenceTables: []
    },
    "user_tables": {
        "fields": {
            "userId": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "true",
                "defaultValue": "null",
                "description": "пользователь"
            },
            "table_module": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "true",
                "defaultValue": "null",
                "description": "название модуля"
            },
            "table_id": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar100,
                "nullable": "true",
                "defaultValue": "null",
                "description": "название таблицы"
            },
            "widths": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "true",
                "defaultValue": "",
                "description": "ширина столбцов через запятую. пример 0,10,100"
            },
            "positions": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "true",
                "defaultValue": "",
                "description": "порядок столбцов"
            },
            "hiddens": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.LongText,
                "nullable": "true",
                "defaultValue": "",
                "description": "скрыть(1)/показать(0) столбец, через запятую. пример 0,0,1,0."
            }
        },
        referenceTables: [
            {
                "thisField": "userId",
                "tableName": "user",
                "field": "id"
            },
            {
                "thisField": "table_module",
                "tableName": "installed_modules",
                "field": "name"
            }
        ]
    },
    "web_query_log_yyyyMM": {
        "fields": {
            "id": {
                "PK": true,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": ""
            },
            "dtime": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.DateTime,
                "nullable": "false",
                "defaultValue": "0000-00-00 00:00:00",
                "description": "дата и время запроса"
            },
            "cid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код договора"
            },
            "ip": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar20,
                "nullable": "false",
                "defaultValue": "",
                "description": "ip адрес с которого пришел запрос"
            },
            "mid": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "",
                "description": "код экземпляра модуля, функции которого вызывались, 0 - ядро"
            },
            "query": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Text,
                "nullable": "false",
                "defaultValue": "",
                "description": "сам запрос"
            },
            "c_title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "false",
                "defaultValue": "",
                "description": "строковое название договора"
            },
            "m_title": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Varchar150,
                "nullable": "false",
                "defaultValue": "",
                "description": "строковое название экземпляра модуля"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "tableId",
                "field": "id"
            },
            {
                "thisField": "mid",
                "tableName": "tableId",
                "field": "id"
            }
        ]
    },
    "web_request_count": {
        "fields": {
            "cid": {
                "PK": true,
                "IX": true,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "код договора"
            },
            "date": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Date,
                "nullable": "false",
                "defaultValue": "0000-00-00",
                "description": "дата"
            },
            "count": {
                "PK": false,
                "IX": false,
                "type": MySQLTypes.Int11,
                "nullable": "false",
                "defaultValue": "0",
                "description": "кол-во"
            }
        },
        referenceTables: [
            {
                "thisField": "cid",
                "tableName": "contract",
                "field": "id (cid=id)"
            }
        ]
    }
}

export type TableKey = keyof typeof db

const tableName = Object.keys(db) as TableKey[]

const propertyNames = tableName as (keyof typeof db)[];


export type TableName = Record<typeof propertyNames[number], string | number>;

type FieldNames = {
    [table in TableKey]: keyof typeof db[table]['fields']
}

const fieldNames: FieldNames = {} as FieldNames;

for (const table of tableName) {
    fieldNames[table] = Object.keys(db[table].fields) as keyof typeof db[TableKey]['fields'];
}

export type FieldName = typeof fieldNames;

export type GetFieldName<T extends TableKey> = Extract<FieldName, T>

export default db
