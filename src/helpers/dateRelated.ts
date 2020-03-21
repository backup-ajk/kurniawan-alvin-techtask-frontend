export function removeDashFromDate(date: string) {
  return date.replace(/-/g, '');
}

export function formatDMY(date: string) {
  const ymd = removeDashFromDate(date);
  return `${ymd.slice(6, 8)}-${ymd.slice(4, 6)}-${ymd.slice(0, 4)}`;
}

export function convertDateToString(date: Date) {
  return `${date.getFullYear().toString()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;
}
