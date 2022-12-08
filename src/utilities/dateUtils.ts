export function isValidDate(year: string, month: string, day: string) {
  const yearNumber = Number.parseInt(year);
  const monthNumber = Number.parseInt(month);
  const dayNumber = Number.parseInt(day);

  // Remember that the month is 0-based so February is actually 1...
  const monthZeroIndexed = monthNumber - 1;
  const d = new Date(yearNumber, monthZeroIndexed, dayNumber);
  if (
    d.getFullYear() === yearNumber &&
    d.getMonth() === monthZeroIndexed &&
    d.getDate() === dayNumber
  ) {
    return true;
  }
  return false;
}

export function daysBetween(dateString1: string, dateString2: string) {
  const [month, day] = dateString1.split('-');
  const [month2, day2] = dateString2.split('-');
  const monthNumber = Number.parseInt(month);
  const dayNumber = Number.parseInt(day);
  const monthNumber2 = Number.parseInt(month2);
  const dayNumber2 = Number.parseInt(day2);
  const monthZeroIndexed = monthNumber - 1;
  const monthZeroIndexed2 = monthNumber2 - 1;
  const date1 = new Date(2020, monthZeroIndexed, dayNumber);
  const date2 = new Date(2020, monthZeroIndexed2, dayNumber2);
  return (date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24;
}
