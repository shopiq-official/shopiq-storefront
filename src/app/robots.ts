import { Product } from "@/types";
import axios from "axios";
import { MetadataRoute } from "next";

const identifier = process.env.NEXT_PUBLIC_IDENTIFIER;

export default function robots(): MetadataRoute.Robots {
  var arr: string[] = [];
  fetch(
    `https://api.shopiq.app/api/products/filter?isVariant=true&identifier=${identifier}&limit=1000000`,
    { next: { tags: ["products"] } }
  )
    .then((res: Response) => res.json() as Promise<{ data: Product[] }>)
    .then(({ data }) => {
      data.forEach((product: Product) => {
        arr.push(
          `${process.env.NEXT_PUBLIC_WEBSITE_URL}/products/${
            product.seListing?.routeHandle || ""
          }`
        );
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
    sitemap: process.env.NEXT_PUBLIC_WEBSITE_URL + "/sitemap.xml",
  };
}
