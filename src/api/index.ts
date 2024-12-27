import { Collection, Contact } from "@/types";
import axios from "axios";

const identifier = process.env.NEXT_PUBLIC_IDENTIFIER;
// const baseUrl = "http://localhost:8080/api/";
const baseUrl = "https://api.shopiq.app/api/";

type Props = {
  url: string;
  method: string;
  data?: any;
  header?: boolean;
  bearer?: boolean;
};

type ObjProp = {
  url: string;
  method: string;
  data?: any;
  headers?: any;
};

const api = (props: Props) => {
  const obj: ObjProp = {
    url: baseUrl + props.url,
    method: props.method,
    data: props.data,
  };

  if (props.header && props.bearer) {
    obj.headers = {
      Authorization: `Bearer ${localStorage.getItem("RETAINO_ACCESS_TOKEN")}`,
    };
  } else if (props.header) {
    obj.headers = {
      Authorization: localStorage.getItem("RETAINO_ACCESS_TOKEN"),
    };
  }

  return axios(obj);
};

export const getCollections = async () => {
  try {
    let res = await fetch(
      `${baseUrl}productcollection/?identifier=${identifier}`,
      { next: { tags: ["collection"] } }
    );
    const data = await res.json();
    return data?.productCollections;
  } catch (err) {
    return [];
  }
};

export const getCategoriesOfType = async () => {
  let response = await fetch(
    `${baseUrl}products/getUniqueCategories?identifier=${identifier}`,
    { next: { tags: ["products", "category"] } }
  );

  response = await response.json();

  return response;
};

export const getContent = async () => {
  let res = await fetch(`${baseUrl}contents?identifier=${identifier}`, {
    next: { tags: ["content"] },
  });

  res = await res.json();

  return res;
};

export const getNewLaunch = async () => {
  try {
    let res = await fetch(
      `${baseUrl}products/filterNew?isVariant=false&identifier=${identifier}&newLaunch=true`,
      { next: { tags: ["products"] } }
    );
    res = await res.json();
    return res;
  } catch (err) {
    throw err;
  }
};

export const getBestSeller = async () => {
  try {
    let res = await fetch(
      `${baseUrl}products/filterNew?isVariant=false&identifier=${identifier}&isBestSeller=true`,
      { next: { tags: ["products"] } }
    );
    res = await res.json();
    return res;
  } catch (err) {
    throw err;
  }
};

export const getFeatured = async () => {
  try {
    let res = await fetch(
      `${baseUrl}products/filterNew?isVariant=false&identifier=${identifier}&isFeatured=true`,
      { next: { tags: ["products"] } }
    );
    res = await res.json();
    return res;
  } catch (err) {
    throw err;
  }
};

export const getByProductType = async (type: string) => {
  try {
    let res = await fetch(
      `${baseUrl}products/filterNew?isVariant=false&identifier=${identifier}&productType=${type}&limit=8&page=1`,
      { next: { tags: ["products"] } }
    );
    res = await res.json();
    return res;
  } catch (err) {
    throw err;
  }
};

export const getByProductCategory = async (category: string) => {
  try {
    let res = await fetch(
      `${baseUrl}products/filterNew?isVariant=false&identifier=${identifier}&category=${category}&limit=8&page=1`,
      { next: { tags: ["products"] } }
    );
    res = await res.json();
    return res;
  } catch (err) {
    throw err;
  }
};

export const getCategories = async () => {
  try {
    let res = await fetch(
      `${baseUrl}productcategory/?identifier=${identifier}`,
      { next: { tags: ["category"] } }
    );
    let data = await res.json();
    return data.productCategories;
  } catch (err) {
    return [];
  }
};

export const searchProducts = async (search: string) => {
  let res = await fetch(
    `${baseUrl}products/search/${identifier}?text=${search}&isVariant=false`
  );
  res = await res.json();
  return res;
};

export const getProductByFilter = async (search: string) => {
  let res = await fetch(
    `${baseUrl}products/filterNew?isVariant=false&identifier=${identifier}&${search}`
  );

  res = await res.json();

  return res;
};

export const getFilterData = async () => {
  let res = await fetch(
    `${baseUrl}products/filterData?identifier=${identifier}`
  );

  res = await res.json();

  return res;
};

export const getKey = async () => {
  let res = await fetch(`${baseUrl}users/verifyuser`, {
    method: "post",
    body: JSON.stringify({ identifier, content: true }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  res = await res.json();
  return res;
};

export const submitContact = async (body: Contact) => {
  let res = await fetch(`${baseUrl}contacts`, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  let data = res.json();

  return data;
};

export const getAllStores = async () => {
  try {
    let res = await fetch(
      `${baseUrl}admins/getAllStores/?identifier=${identifier}`,
      { next: { tags: ["stores"] } }
    );
    let data = await res.json();
    return data?.data[0];
  } catch (err) {
    return {};
  }
};

export const getCartFromServer = async () => {
  let res = await fetch(
    `${baseUrl}carts/${window.Retaino.getUserId()}/?identifier=${identifier}`
  );

  res = await res.json();

  return res;
};

export const deleteCartItemFromServer = async (id: string) => {
  let res = await axios({
    method: "PATCH",
    url: `${baseUrl}carts/removeCartItem`,
    data: {
      identifier,
      userId: window?.Retaino.getUserId(),
      productId: id,
    },
  });

  return res;
};

export const deleteCartFromServer = async (id: string) => {
  let res = await fetch(`${baseUrl}carts/${id}`, { method: "delete" });
  res = await res.json();
  return res;
};

export const updateCartApi = async (data: any) => {
  try {
    let res = await axios({
      url: `${baseUrl}carts/${window.Retaino?.getUserId()}`,
      method: "PATCH",
      data: { ...data, identifier },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("RETAINO_ACCESS_TOKEN")}`,
      },
    });

    return res;
  } catch (err) {
    throw err;
  }
};

export const addToCartApi = async (data: any) => {
  let res = await fetch(`${baseUrl}carts`, {
    method: "post",
    body: JSON.stringify({
      ...data,
      identifier,
      userId: window?.Retaino?.getUserId(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("RETAINO_ACCESS_TOKEN")}`,
    },
  });
  res = await res.json();

  return res;
};

export const localToCloudApi = async (data: any) => {
  let res = await fetch(`${baseUrl}carts`, {
    method: "post",
    body: JSON.stringify({
      ...data,
      identifier,
      userId: window?.Retaino?.getUserId(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("RETAINO_ACCESS_TOKEN")}`,
    },
  });

  res = await res.json();

  return res;
};

export const getProductById = async (id: string) => {
  const res = await fetch(`${baseUrl}products/${id}`);

  return res.json();
};

export const getAllProductMedia = async () => {
  const res = await fetch(`${baseUrl}productmedia/?identifier=${identifier}`, {
    next: { tags: ["productMedia"] },
  });

  return res.json();
};

export const getAllProducts = async () => {
  let res = await fetch(
    `${baseUrl}products/filterNew?isVariant=false&identifier=${identifier}&limit=10000&page=1`
  );

  let data = await res.json();

  return data?.data || [];
};

export const getProductBySlug = async (slug: string) => {
  let res = await fetch(`${baseUrl}products/${identifier}/${slug}`, {
    next: { tags: ["products"] },
  });
  res = await res.json();
  return res;
};

export const getSimilarProductData = async (cat: string, type: string) => {
  let res: any = await fetch(
    `${baseUrl}products/filterNew?isVariant=false&identifier=${identifier}&category=${cat}&productType=${type}`,
    { next: { tags: ["products"] } }
  );
  res = await res.json();
  return res?.data || [];
};

export const placeOrder = async (data: any) => {
  const body = {
    ...data,
    identifier,
  };

  if (localStorage.getItem("UTM_DATA")) {
    body.campaign = {
      ...JSON.parse(localStorage.getItem("UTM_DATA")!),
    };
  }

  if (window?.Retaino?.isLoggedIn()) {
    body.customerId = window?.Retaino?.getUserId();
  }

  const res = await axios({
    url: `${baseUrl}orders`,
    data: body,
    method: "post",
  });

  return res;
};

export const handlePaymentApi = async (
  data: any,
  current_order: any,
  token: string
) => {
  let res = await axios({
    url: `${baseUrl}orders/product/user/${current_order}`,
    data: data,
    method: "patch",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getDiscountsApi = async () => {
  let res = await fetch(`${baseUrl}discounts?identifier=${identifier}`, {
    next: { tags: ["discounts"] },
  });
  res = await res.json();
  return res;
};

export const getCompliance = async () => {
  let res = await fetch(`${baseUrl}compliances?identifier=${identifier}`, {
    next: { tags: ["compliances"] },
  });
  res = await res.json();
  return res;
};

export const getWebsiteData = async () => {
  let res = await fetch(
    `${baseUrl}admins/getWebsiteDataForClient?identifier=${identifier}`
  );

  res = await res.json();

  return res;
};

export default axios;
