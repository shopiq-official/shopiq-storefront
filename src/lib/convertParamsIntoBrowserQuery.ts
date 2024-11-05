export const convertParamsIntoBrowserQuery = (params: any) => {
  let queryString = "";

  Object.keys(params).forEach((v) => {
    if (Array.isArray(params[v])) {
      queryString += `${params[v].map((vv: any) => `${v}=${vv}`).join("&")}&`;
    } else {
      queryString += `${v}=${params[v]}&`;
    }
  });

  return queryString;
};
