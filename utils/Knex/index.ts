import { db } from './knex';
import schema from '@/utils/DB/db'
import { Table, Metadata } from './db-metadata';

interface QueryResult {
  scid: number;
  frac: number;
  comment: string;
  area: string;
  quarter: string;
  street: string;
  city: string;
  flat: string;
  room: string;
  pod: string;
  floor: string;
}

async function main(): Promise<void> {
  const metadata: Metadata = schema;
  const contractTable: Table | undefined = metadata['contract']?.[0];
  const contractParam2Table: Table | undefined = metadata['contract_parameter_type_2']?.[0];
  const addressHouseTable: Table | undefined = metadata['address_house']?.[0];
  const addressQuarterTable: Table | undefined = metadata['address_quarter']?.[0];
  const addressStreetTable: Table | undefined = metadata['address_street']?.[0];
  const addressAreaTable: Table | undefined = metadata['address_area']?.[0];
  const addressCityTable: Table | undefined = metadata['address_city']?.[0];

  if (!contractTable || !contractParam2Table || !addressHouseTable || !addressQuarterTable || !addressStreetTable || !addressAreaTable || !addressCityTable) {
    console.error('Ошибка: не удалось получить метаданные всех необходимых таблиц');
    return;
  }

  const fields: string[] = [
    'contract.scid as scid',
    'address_house.frac as frac',
    'address_house.comment as comment',
    'address_area.title as area',
    'address_quarter.title as quarter',
    'address_street.title AS street',
    'address_city.title AS city',
    'contract_parameter_type_2.flat as flat',
    'contract_parameter_type_2.room as room',
    'contract_parameter_type_2.pod as pod',
    'contract_parameter_type_2.floor as floor'
  ];

  const queryResult: QueryResult[] = await db.select(fields)
    .from(contractTable.tableName)
    .join(contractParam2Table.tableName, `${contractTable.tableName}.id`, '=', `${contractParam2Table.tableName}.cid`)
    .join(addressHouseTable.tableName, `${contractParam2Table.tableName}.hid`, '=', `${addressHouseTable.tableName}.id`)
    .join(addressQuarterTable.tableName, `${addressHouseTable.tableName}.quarterId`, '=', `${addressQuarterTable.tableName}.id`)
    .join(addressStreetTable.tableName, `${addressHouseTable.tableName}.streetId`, '=', `${addressStreetTable.tableName}.id`)
    .join(addressAreaTable.tableName, `${addressHouseTable.tableName}.areaId`, '=', `${addressAreaTable.tableName}.id`)
    .join(addressCityTable.tableName, `${addressQuarterTable.tableName}.cityId`, '=', `${addressCityTable.tableName}.id`);

  console.log(queryResult);

  db.destroy();
}

main().catch((error: Error) => {
  console.error(error);
});
