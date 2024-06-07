function toApexDate(date) {
  const yearStr = date.getFullYear() % 100;
  const monthStr = date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const dayStr = date.getDate() > 8 ? date.getDate() + 1 : `0${date.getDate() + 1}`;
  return `${yearStr}${monthStr}${dayStr}`;
}
