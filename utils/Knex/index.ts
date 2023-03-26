import knex from '@/utils/Knex/knex'
import schema, { FieldName, TableKey } from '@/utils/DB/db'
import { Table, Metadata } from './db-metadata';

const metadata = schema

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
  const metadata = schema;
  const contractTable: Table<'contract'> = metadata.contract;
  const contractParam2Table = metadata.contract_parameter_type_2;
  const addressHouseTable = metadata.address_house;
  const addressQuarterTable = metadata.address_quarter;
  const addressStreetTable = metadata.address_street;
  const addressAreaTable = metadata.address_area;
  const addressCityTable = metadata.address_city;

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

  const queryResult: QueryResult[] = await knex.select(fields)
    .from('contract')
    .join('contract_parameter_type_2', `contract.id`, '=', `contract_parameter_type_2.cid`)
    .join('address_house', `contract_parameter_type_2.hid`, '=', `address_house.id`)
    .join('address_quarter', `address_house.quarterId`, '=', `address_quarter.id`)
    .join('address_street', `address_house.streetId`, '=', `address_street.id`)
    .join('address_area', `address_house.areaId`, '=', `address_area.id`)
    .join('address_city', `address_quarter.cityId`, '=', `address_city.id`);

  console.log(queryResult);

  knex.destroy();
}

main().catch((error: Error) => {
  console.error(error);
});
