import { getCategoriesOfType } from "@/api";
import { MetadataRoute } from "next";

const identifier = process.env.NEXT_PUBLIC_IDENTIFIER;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const arr: any = [
    {
      url: process.env.NEXT_PUBLIC_WEBSITE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: process.env.NEXT_PUBLIC_WEBSITE_URL+"/products",
      lastModified: new Date(),
      priority: 0.8,
    },

    {
      url: process.env.NEXT_PUBLIC_WEBSITE_URL+"/know-your-brand",
      lastModified: new Date(),
      priority: 0.8,
    },

    {
      url: process.env.NEXT_PUBLIC_WEBSITE_URL+"/contact-us",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: process.env.NEXT_PUBLIC_WEBSITE_URL+"/policies/privacy-policy",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: process.env.NEXT_PUBLIC_WEBSITE_URL+"/policies/terms-and-conditions",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "WEBSITE_UR/Lpolicies/return-policy",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: process.env.NEXT_PUBLIC_WEBSITE_URL+"/policies/shipping-policy",
      lastModified: new Date(),
      priority: 0.8,
    },
  ];

  let res: any = await fetch(
    `https://backend.cftcommerce.com/api/products/filter?isVariant=false&identifier=${identifier}&limit=1000000`,
    { next: { tags: ["products"] } }
  );

  res = await res.json();

  res.data.forEach((product: any) => {
    arr.push({
      url:
        process.env.NEXT_PUBLIC_WEBSITE_URL+"/products/" +
        product.seListing?.routeHandle,
      lastModified: product?.updatedAt,
      priority: 0.8,
    });
  });

  let cat_res: any = await getCategoriesOfType();

  let keys = Object.keys(cat_res).filter((val) => val);

  keys.forEach((val) => {
    arr.push({
      url: process.env.NEXT_PUBLIC_WEBSITE_URL+ val,
      priority: 0.8,
    });
  });

  for (let i = 0; i < keys.length; i++) {
    if (cat_res[keys[i]].length !== 0) {
      for (let j = 0; j < cat_res[keys[i]].length; j++) {
        arr.push({
          url: process.env.NEXT_PUBLIC_WEBSITE_URL+`/${keys[i]}/${cat_res[keys[i]][j]}`,
          priority: 0.8,
        });
      }
    }
  }

  return [...arr];
}
