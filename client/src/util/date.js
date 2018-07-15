export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export const toYYYYMMDD = date => {
  const d = new Date(date);
  const month = d.getMonth() + 1 - 4;
  const actualMonth = month < 10 ? `0${month}` : month;
  const actualDate = d.getDate();

  // return `${d.getFullYear()}-${actualMonth}-${d.getDate()}`;
  return `2024-${actualMonth}-${actualDate}`;
  //2024-03-06`;
};
