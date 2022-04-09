export const metersToFtInString = (n) => {
  const realFeet = (n * 39.37) / 12;
  const feet = Math.floor(realFeet);
  const inches = Math.round((realFeet - feet) * 12);
  return feet + "'" + inches + '"';
};

export const kgToPounds = (n) => {
  return Math.round(n * 2.205 * 10) / 10;
};
