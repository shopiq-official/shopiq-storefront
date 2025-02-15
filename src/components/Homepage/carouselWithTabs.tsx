"use client";
import { Suspense } from "react";
import styles from "./carouselWithTabs.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Product } from "@/types";

const ProductCarousel = dynamic(
  () => import("@/common/carousels/productCarousel/productCarousel"),
  {
    ssr: false,
    loading: () => <p>Loading Product Carousel...........</p>,
  }
);

const CarouselWithTabs = ({
  title,
  description,
  data,
  type,
  link,
}: {
  title: string;
  description: string;
  data: Product[];
  type?: string;
  link?: string;
}) => {
  return (
    <>
      <div className={`${styles.filter_main}`}>
        <div
          className={`${styles.best_sellers} ${styles.product_carousel}`}
          // key={index}
        >
          <div className={styles.carousel_heading}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <Suspense fallback={<p>Loading</p>}>
            <ProductCarousel data={data} />
          </Suspense>
          <div className={styles.view_all_container}>
            <Link
              href={link || `/products?category=${title}`}
              aria-label="View more data"
              className={styles.view_more}
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselWithTabs;
