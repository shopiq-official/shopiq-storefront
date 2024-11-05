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



// Function to generate static parameters for product pages

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product: any) => ({
    slug: product.seListing.routeHandle,
  }));
}

// Main Page component for displaying product details

export default async function Page({ params }: any) {
  const { slug } = params;

  let data: any = await getProductBySlug(slug);

  data = data?.product[0];
  // Fetch discounts data
  let discounts: any = await getDiscountsApi();
  discounts = discounts.discounts;

  // Check if the product is out of stock
  const isOutOfStock =
    data.inventory.currentQuantity == 0 && data.inventory.sellOutstock == false;

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
                <span>{capitalize(data?.category)}</span>
              </Link>
              <h1>{data?.title}</h1>
            </div>
            {/* Display product images  with carousels and magnification*/}
            <ProductImages
              data={data?.mediaUrl?.map(
                (val: any) => `${process.env.NEXT_PUBLIC_IMAGE}${val}`
              )}
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
                    <span>{capitalize(data?.productType)}</span>
                  </Link>{" "}
                  <p style={{ color: "var(--secondary)" }}>/</p>
                  <Link
                    aria-label="product category"
                    href={"/products?category=" + data?.category}
                  >
                    <span>{capitalize(data?.category)}</span>
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
                  {data?.specifications?.map((val: any, index: any) => {
                    return (
                      <li key={index}>
                        <span>{capitalize(val?.options_name)} : </span>
                        <span>
                          {val?.options_value?.length === 1
                            ? capitalize(val.options_value[0])
                            : val.options_value.join(", ")}
                        </span>
                      </li>
                    );
                  })}
                  <li>County of Origin : {data.countryOfOrigin}</li>
                </ul>
              </div>
            )}
            <Suspense fallback={<p>Loading....</p>}>
              <ProductControls
                data={data}
                isOutOfStock={isOutOfStock}
                discounts={discounts}
              />
            </Suspense>
          </div>
        </div>

        <div className={styles.main_epc_parent}>
          {data.epc.length > 0 &&
            data.epc.map((val: any, index: any) => {
              return (
                <div className={styles.epc_container} key={index}>
                  <div>
                    <Image
                      src={process.env.NEXT_PUBLIC_IMAGE + val.mediaUrl}
                      height={2000}
                      width={2000}
                      alt=".."
                    />
                  </div>
                  <div>
                    <h1> {val?.title}</h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: val?.description,
                      }}
                    ></p>
                  </div>
                </div>
              );
            })}
        </div>
        {
          <RecommendedProducts
            category={data.category}
            productType={data.productType}
          />
        }
      </div>
    </>
  );
}
