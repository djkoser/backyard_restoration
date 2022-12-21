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

/**Calculates days between two strings in MM-DD format*
 * @param firstDate earlier of the two dates in MM-DD format
 * @param lastDate later of the two dates in MM-DD format
 */
export function daysBetween(firstDate: string, lastDate: string) {
  const [month, day] = firstDate.split('-');
  const [month2, day2] = lastDate.split('-');
  const firstMonthNumber = Number.parseInt(month);
  const firstDayNumber = Number.parseInt(day);
  const lastMonthNumber = Number.parseInt(month2);
  const lastDayNumber = Number.parseInt(day2);
  const firstMonthZeroIndexed = firstMonthNumber - 1;
  const lastMonthZeroIndexed = lastMonthNumber - 1;
  const firstDateObj = new Date(2020, firstMonthZeroIndexed, firstDayNumber);
  const lastDateObj = new Date(2020, lastMonthZeroIndexed, lastDayNumber);
  return (lastDateObj.getTime() - firstDateObj.getTime()) / 1000 / 60 / 60 / 24;
}
