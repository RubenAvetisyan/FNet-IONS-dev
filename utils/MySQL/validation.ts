// Импорт типов из файла field-type.d.ts и types.d.ts

import { MySQLTypes } from "./field-type";
import { FieldType } from './validation'

// Функция валидации
export function validateValue(fieldType: FieldType, value: any): boolean {
  const type = fieldType.type;

  // Проверка на соответствие типу данных и значению
  switch (type) {
    case MySQLTypes.Int10:
    case MySQLTypes.Int11:
    case MySQLTypes.Int2:
    case MySQLTypes.Int3:
      return typeof value === "number" && Number.isInteger(value);
    case MySQLTypes.Varchar150:
    case MySQLTypes.Varchar255:
    case MySQLTypes.Varchar30:
    case MySQLTypes.Varchar100:
    case MySQLTypes.Varchar10:
    case MySQLTypes.Varchar200:
    case MySQLTypes.Varchar6:
    case MySQLTypes.Varchar250:
    case MySQLTypes.Varchar512:
    case MySQLTypes.Varchar50:
    case MySQLTypes.Varchar25:
    case MySQLTypes.Varchar40:
    case MySQLTypes.Varchar15:
    case MySQLTypes.Varchar5:
    case MySQLTypes.Varchar400:
    case MySQLTypes.Varchar14:
    case MySQLTypes.Varchar2:
    case MySQLTypes.Varchar45:
    case MySQLTypes.Varchar90:
    case MySQLTypes.Varchar20:
    case MySQLTypes.Varchar1024:
    case MySQLTypes.Varchar4:
    case MySQLTypes.Varchar16:
    case MySQLTypes.Varchar60:
    case MySQLTypes.Varchar300:
    case MySQLTypes.Varchar240:
    case MySQLTypes.Varchar128:
    case MySQLTypes.Varchar256:
    case MySQLTypes.Varchar8:
    case MySQLTypes.Varchar500:
      return typeof value === "string" && value.length <= fieldType.length;
    case MySQLTypes.Date:
      return value instanceof Date;
    case MySQLTypes.Text:
    case MySQLTypes.LongText:
    case MySQLTypes.MediumText:
      return typeof value === "string";
    case MySQLTypes.DateTime:
    case MySQLTypes.Timestamp:
      return value instanceof Date;
    case MySQLTypes.Char40:
    case MySQLTypes.Char200:
    case MySQLTypes.Char50:
    case MySQLTypes.Char150:
    case MySQLTypes.Char15:
    case MySQLTypes.Char255:
    case MySQLTypes.Char32:
      return typeof value === "string" && value.length <= fieldType.length;
    case MySQLTypes.TinyInt1:
    case MySQLTypes.TinyInt2:
    case MySQLTypes.TinyInt3:
    case MySQLTypes.TinyInt4:
    case MySQLTypes.SmallInt5:
    case MySQLTypes.SmallInt6:
      return typeof value === "number" && Number.isInteger(value);
    case MySQLTypes.Float:
    case MySQLTypes.Float10_2:
      return typeof value === "number";
    case MySQLTypes.Blob:
    case MySQLTypes.LongBlob:
    case MySQLTypes.MediumBlob:
      return value instanceof Buffer || typeof value === "string";
    case MySQLTypes.Decimal10_2:
    case MySQLTypes.Decimal15_5:
    case MySQLTypes.Decimal15_2:
    case MySQLTypes.Decimal10_5:
    case MySQLTypes.Decimal10_0:
      return typeof value === "number";
    case MySQLTypes.EnumPCA:
      return value === 'p' || value === 'c' || value === 'a';
    case MySQLTypes.Int1Unsigned:
    case MySQLTypes.Int3Unsigned:
    case MySQLTypes.Int10Unsigned:
    case MySQLTypes.Int11Unsigned:
      return typeof value === "number" && Number.isInteger(value) && value >= 0;
    case MySQLTypes.TinyInt1Unsigned:
    case MySQLTypes.TinyInt3Unsigned:
      return typeof value === "number" && Number.isInteger(value) && value >= 0;
    case MySQLTypes.SmallInt5Unsigned:
      return typeof value === "number" && Number.isInteger(value) && value >= 0;
    case MySQLTypes.Bit1:
      return typeof value === "boolean";
    case MySQLTypes.DateTime_MariaDB53:
    case MySQLTypes.Timestamp_MariaDB53:
      return value instanceof Date;
    default:
      throw new Error("Неизвестный тип данных: " + type);
  }
}
