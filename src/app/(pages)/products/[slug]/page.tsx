import {
  getAllProducts,
  getDiscountsApi,
  getProductBySlug,
  getSimilarProductData,
} from "@/api";
import SimilarProducts from "@/components/productDetail/similarProducts";

import styles from "./page.module.css";
import Link from "next/link";
import { capitalize } from "@/lib/capitalize";
import Image from "next/image";
import ProductImages from "@/components/productDetail/productImages";
import { Suspense } from "react";
import ProductControls from "@/components/productDetail/productControls";
import RecommendedProducts from "@/components/productDetail/recommendedProducts";
import ShareSection from "@/components/productDetail/shareSection";
import { Discount, epcProp, Product, variantProp } from "@/types";

// Function to generate static parameters for product pages

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product: Product) => ({
    slug: product?.seListing?.routeHandle,
  }));
}

// Main Page component for displaying product details

export default async function Page({
  params,
}: {
  params: Record<string, string>;
}) {
  const { slug } = params;

  let response = (await getProductBySlug(slug)) as unknown as {
    status?: "success";
    product?: Product[];
  };

  let data: Product | undefined = response?.product
    ? response.product[0]
    : undefined;
  // console.log(data);
  // Fetch discounts data
  let discountsResponse = (await getDiscountsApi()) as unknown as {
    discounts: Discount;
  };

  let discounts: Discount = discountsResponse?.discounts;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.carousel}>
            <div className={styles.mob_heading}>
              <Link
                aria-label="product category"
                href={"/products?category=" + data?.category}
              >
                <span>{capitalize(data?.category ?? "")}</span>
              </Link>
              <h1>{data?.title}</h1>
            </div>
            {/* Display product images  with carousels and magnification*/}
            <ProductImages
              data={data?.mediaUrl?.map((val: string) => `${val}`)}
              similar={data}
            />
          </div>

          <div className={styles.details}>
            <div className={styles.heading}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "0.7vw" }}>
                  <Link
                    aria-label="product type"
                    href={"/products?productType=" + data?.productType}
                  >
                    <span>{capitalize(data?.productType ?? "")}</span>
                  </Link>{" "}
                  <p style={{ color: "var(--secondary)" }}>/</p>
                  <Link
                    aria-label="product category"
                    href={"/products?category=" + data?.category}
                  >
                    <span>{capitalize(data?.category ?? "")}</span>
                  </Link>
                </div>
                <ShareSection />
              </div>
              <h1>{data?.title}</h1>
            </div>
            {data?.specifications?.length !== 0 && (
              <div className={styles.specification}>
                <h3>specification</h3>
                <ul>
                  {data?.specifications?.map(
                    (
                      val: Pick<
                        variantProp,
                        "options_name" | "options_value"
                      > & { isVisible?: boolean },
                      index: number
                    ) => {
                      return (
                        <li key={index}>
                          <span>{capitalize(val?.options_name ?? "")} : </span>
                          <span>
                            {val?.options_value?.length === 1
                              ? capitalize(val.options_value[0])
                              : val?.options_value?.join(", ")}
                          </span>
                        </li>
                      );
                    }
                  )}
                  <li>County of Origin : {data?.countryOfOrigin}</li>
                </ul>
              </div>
            )}
            <Suspense fallback={<p>Loading....</p>}>
              <ProductControls data={data} discounts={discounts} />
            </Suspense>
          </div>
        </div>

        <div className={styles.main_epc_parent}>
          {data?.epc &&
            data?.epc?.length > 0 &&
            data.epc.map((val: epcProp, index: number) => {
              return (
                <div className={styles.epc_container} key={index}>
                  <div>
                    <Image
                      src={val?.mediaUrl ?? ""}
                      height={2000}
                      width={2000}
                      alt=".."
                    />
                  </div>
                  <div>
                    <h1> {val?.title}</h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: val?.description ?? "",
                      }}
                    ></p>
                  </div>
                </div>
              );
            })}
        </div>
        {
          <RecommendedProducts
            category={data?.category}
            productType={data?.productType}
          />
        }
      </div>
    </>
  );
}
