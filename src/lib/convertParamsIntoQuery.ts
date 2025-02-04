export const convertParamsIntoQuery = (params: Record<string, number | string | string [] | boolean>) => {
  console.log("params", params);
  let queryString = "";

  // console.log(params);

  Object.keys(params).forEach((v) => {
    if (Array.isArray(params[v])) {
      queryString += `${params[v]
        .map((vv: string) => `${v}[]=${vv}`)
        .join("&")}&`;
    } else {
      if (v === "page") {
      } else if (v === "price") {
        if (params?.price === "under-999") {
          queryString += `minPrice=0&maxPrice=999&`;
        } else if (params?.price === "999") {
          queryString += `minPrice=999&maxPrice=999&`;
        } else if (params?.price === "999-1499") {
          queryString += "minPrice=999&maxPrice=1499&";
        } else if (params?.price === "1499-1999") {
          queryString += "minPrice=1400&maxPrice=1999&";
        } else if (params?.price === "above-1999") {
          queryString += "minPrice=1999&maxPrice=10000000";
        }
      } else if (v === "productType" && params?.productType === "newLaunch") {
        queryString += "newLaunch=true&";
      } else if (v === "productType" && params?.productType === "bestSeller") {
        queryString += "isBestSeller=true&";
      } else if (v === "productType" && params?.productType === "featured") {
        queryString += "isFeatured=true&";
      } else {
        queryString += `${v}[]=${params[v]}&`;
      }
    }
  });

  return queryString;
};
