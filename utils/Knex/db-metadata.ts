export interface Table {
  fields: {
    [key: string]: {
      PK: boolean;
      IX: boolean;
      type: FieldType;
      nullable: string;
      defaultValue: string;
      description: string;
    };
  };
  refferenceTables: {
    thisField: string;
    tableName: string;
    field: string;
  }[];
}

export type Metadata = {
  [key: string]: Table[];
} // where the key is the name of DATABASE TABLE
