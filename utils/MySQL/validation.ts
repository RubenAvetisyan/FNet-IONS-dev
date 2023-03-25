// Функции валидации для каждого типа данных
function validatePK(pk: PK): boolean {
  if (typeof pk !== 'number' || pk < 0) {
    return false;
  }
  return true;
}
