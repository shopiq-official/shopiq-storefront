export const capitalize = (str: string) => {
  if (str === undefined || str === null) return str;

  return str
    ?.split(" ")
    .map((word) => word?.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
