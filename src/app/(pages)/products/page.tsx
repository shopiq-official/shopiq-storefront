
import styles from "./products.module.css";
import { Filter } from "@/components/products/filter"; 
import { Suspense } from "react"; 
import ProductsList from "@/components/products/productsList"; 
import { FilterMobile } from "@/components/products/filterMobile"; 
import { getCategories, getFilterData } from "@/api"; 
import Image from "next/image"; 

// Main Page component
const Page = async ({ searchParams, params }: any) => {
  // Fetching categories and filter data from the API
  const category = await getCategories();
  const filterData = await getFilterData();

  return (
    <div>
      {/* Hero Section */}
      <div>
        {searchParams.category ? (
          <>
            {Array.isArray(searchParams.category) ? (
              <div className={styles.simple_hero}>
                <h1>shop</h1>
                <FilterMobile
                  params={{ ...searchParams }} // Passing search parameters to the mobile filter
                  filterData={filterData} // Passing filter data to the mobile filter
                />
              </div>
            ) : (
              <>
                {/* Displaying category banner if it exists */}
                {category.find(
                  (v: any) =>
                    v.title.toLowerCase().trim() === searchParams.category
                )?.media[0]?.mediaUrl && (
                  <div className={styles.banner}>
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_IMAGE +
                        category.find(
                          (v: any) =>
                            v.title.toLowerCase().trim() ===
                            searchParams.category
                        ).media[0].mediaUrl
                      }
                      width={1000}
                      height={400}
                      alt="" // Alt text should be descriptive for accessibility
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // Ensures the image covers the area without distortion
                      }}
                    />
                  </div>
                )}
                <div className={styles.simple_hero}>
                  <h1>{searchParams.category}</h1>
                  <FilterMobile
                    params={{ ...searchParams }} // Passing search parameters to the mobile filter
                    filterData={filterData} // Passing filter data to the mobile filter
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <div className={styles.simple_hero}>
            <h1>shop</h1>
            <FilterMobile
              params={{ ...searchParams }} // Passing search parameters to the mobile filter
              filterData={filterData} // Passing filter data to the mobile filter
            />
          </div>
        )}
      </div>
      {/* Contains Filter Section & Products List */}
      <div className={styles.filter_and_product_container}>
        <Filter params={{ ...searchParams }} /> {/* Desktop filter component */}
        <Suspense
          fallback={
            <div
              style={{
                width: "100%",
                height: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="loader"></span> {/* Loader while products are being fetched */}
            </div>
          }
        >
          <ProductsList searchParams={searchParams} /> {/* List of products based on search parameters */}
        </Suspense>
      </div>
    </div>
  );
};

export default Page; // Exporting the Page component for use in other parts of the application
