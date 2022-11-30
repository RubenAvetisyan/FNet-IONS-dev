export enum UserGroupId {
  Admin = 20,
  Accountent = 27,
  Operator = 26,
  Inspector = 28,
  User = 1 | 3 | 4 | 5,
}

export enum UserGroupName {
  Admin = 'Ադմինիստրատոր',
  Accountent = 'Հաշվապահ',
  Operator = 'Օպերատոր',
  Inspector = 'Տեսուչ',
}

export enum UserGroupRoleId {
  Administrator = 2,
  Employee = 1,
  OfficeWorker = 5,
  ServiceCenter = 7,
  CallCenter = 8,
}

export enum UserGroupRoleName {
  Administrator = 'Ադմինիստրատոր',
  Employee = 'Сотрудник',
  OfficeWorker = 'Գրասենյակի աշխատակից',
  ServiceCenter = 'Սպասարկման Սրահ',
  CallCenter = 'Զանգերի Կենտրոն',
}