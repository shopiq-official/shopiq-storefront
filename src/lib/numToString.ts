export const numToString = (val: number, digit: number) => {
  const valStr = val.toString();

  if (valStr.length === digit) {
    return valStr;
  }

  if (valStr.length < digit) {
    return `${"0".repeat(digit - valStr.length)}${valStr}`;
  }
};
