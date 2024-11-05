import { MetadataRoute } from "next";

const identifier = process.env.NEXT_PUBLIC_IDENTIFIER;

export default function robots(): MetadataRoute.Robots {
  var arr: any = [];
  fetch(
    `https://backend.cftcommerce.com/api/products/filter?isVariant=true&identifier=${identifier}&limit=1000000`,
    { next: { tags: ["products"] } }
  ).then((res: any) => {
    res?.data?.forEach((product: any) => {
      arr.push(process.env.NEXT_PUBLIC_WEBSITE_URL+"/products/" + product.seListing?.routeHandle);
    });
  });

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        ...arr,
        "/policies/cancellation",
        "/policies/data",
        "/policies/terms",
        "/policies/privacy",
        "/account",
        "/orders",
        "/cart",
      ],
    },
    sitemap: process.env.NEXT_PUBLIC_WEBSITE_URL+"/sitemap.xml",
  };
}
