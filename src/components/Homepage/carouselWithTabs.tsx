"use client";
import { Suspense, useState } from "react";
import styles from "./carouselWithTabs.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";

const ProductCarousel = dynamic(
  () => import("@/common/carousels/productCarousel/productCarousel"),
  {
    ssr: false,
    loading: () => <p>Loading Product Carousel...........</p>,
  }
);

const CarouselWithTabs = ({ data, selected, type = "" }: any) => {
  const [selectedfeature, setSelectedFeature] = useState(selected); // State to track the selected feature

  return (
    <div className={styles.filter_main}>
      <Tabs
        setValue={setSelectedFeature} // Function to update selected feature
        value={selectedfeature} // Current selected feature
        values={data} // Data for the tabs
      />

      {data
        .filter((v: any) => v.value === selectedfeature) // Filter data based on selected feature
        .map((value: any, index: number) => {
          return (
            <div
              className={`${styles.best_sellers} ${styles.product_carousel}`}
              key={index}
            >
              <Suspense fallback={<p>Loading</p>}>
                <ProductCarousel data={value.list} /> {/* Product carousel for the selected feature */}
              </Suspense>
              <div className={styles.view_all_container}>
                <Link
                  href={type ? `/${selectedfeature}` : `/${selectedfeature}`} // Link to view all products
                  aria-label="View more data"
                  className={styles.view_more}
                >
                  View All
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

type TabProps = {
  setValue: any; // Function to set the selected tab value
  value: any; // Current selected tab value
  values: { text: string; value: string }[]; // Array of tab values and their display text
};

const Tabs = ({ setValue, value, values }: TabProps) => {
  return (
    <div className={styles.filter_top}>
      {values.map((val, index: number) => {
        return (
          <h1
            key={index}
            onClick={() => setValue(val.value)} // Update selected tab on click
            style={{
              backgroundColor: value == val.value ? "var(--primary)" : "", // Highlight selected tab
              color: value == val.value ? "var(--neutral)" : "", // Change text color for selected tab
            }}
          >
            {val.text} {/* Display tab text */}
          </h1>
        );
      })}
    </div>
  );
};

export default CarouselWithTabs; // Exporting the CarouselWithTabs component
