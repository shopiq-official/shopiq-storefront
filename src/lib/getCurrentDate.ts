export const getCurrentDate = () => {
  const date = new Date();

  const year = date.getFullYear();

  const month =
    String(date.getMonth() + 1).length === 1
      ? "0" + String(date.getMonth() + 1)
      : String(date.getMonth() + 1);

  const day =
    String(date.getDate()).length === 1
      ? "0" + String(date.getDate())
      : String(date.getDate());

  return `${year}-${month}-${day}`;
};
