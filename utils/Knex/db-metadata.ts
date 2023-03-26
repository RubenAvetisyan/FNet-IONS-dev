import { MySQLTypes } from '@/utils/MySQL/field-type';
import { TableName, FieldName, TableKey } from '@/utils/DB/db';

export interface Table<T extends TableKey> {
  fields: {
    [fieldName in FieldName[T]]: {
      PK: boolean;
      IX: boolean;
      type: MySQLTypes;
      nullable: string;
      defaultValue: string;
      description: string;
    };
  };
  referenceTables: {
    thisField: string;
    tableName: string;
    field: string;
  }[];
}

export type Metadata = {
  [tableName in TableKey]: Table<TableKey>;
};
