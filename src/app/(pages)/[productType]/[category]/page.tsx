import styles from "./products.module.css";
import { Filter } from "@/components/products/filter";
import { Suspense } from "react";
import ProductsList from "@/components/products/productsList";
import { FilterMobile } from "@/components/products/filterMobile";
import { getCategories, getCategoriesOfType, getFilterData } from "@/api";
import Image from "next/image";
import { Category } from "@/types";

// Function to generate static parameters for the page
export async function generateStaticParams() {
  const categories: Record<string, string[]> = await getCategoriesOfType();

  let all_values = [];
  const p_types = Object.keys(categories).filter((val) => val);

  for (let i = 0; i < p_types.length; i++) {
    let p_t = p_types[i];

    // Check if there are categories for the product type
    if (categories[p_t].length === 0) {
      all_values.push([p_t, ""]);
    } else {
      for (let j = 0; j < categories[p_types[i]].length; j++) {
        all_values.push([p_t, categories[p_t][j]]);
      }
    }
  }

  // Return filtered and mapped values for static generation
  return all_values
    .filter((v) => v[0] && v[1])
    .map((product: string[]) => ({
      productType: product[0],
      category: product[1],
    }));
}

// Main Page component
const Page = async ({
  searchParams,
  params,
}: {
  searchParams: Record<string, string | number | boolean>;
  params: Record<string, string>;
}) => {
  const category = await getCategories(); // Fetch categories
  const filterData = await getFilterData(); // Fetch filter data

  let [productType, cat] = [
    decodeURIComponent(params.productType), // Decode product type from params
    decodeURIComponent(params.category), // Decode category from params
  ];

  // Return empty fragment if category is not defined
  if (!cat) return <></>;

  const selectedCategory = category.find(
    (v: Category) =>
      v?.title && v.title.toLowerCase().trim() === searchParams.category
  );

  const mediaUrl = selectedCategory?.media?.[0]?.mediaUrl;

  return (
    <div>
      {/* Hero Section */}
      <div>
        {cat ? (
          <>
            {Array.isArray(cat) ? (
              <div className={styles.simple_hero}>
                <h1>shop</h1>
                <FilterMobile
                  params={{ ...searchParams, category: cat, productType }}
                  filterData={filterData}
                />
              </div>
            ) : (
              <>
                <div className={styles.banner}>
                  <Image
                    src={mediaUrl || "/placeholder.jpg"}
                    width={1000}
                    height={400}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className={styles.simple_hero}>
                  <h1>{cat}</h1>
                  <FilterMobile
                    params={{ ...searchParams, category: cat, productType }}
                    filterData={filterData}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <div className={styles.simple_hero}>
            <h1>shop</h1>
            <FilterMobile
              params={{ ...searchParams, category: cat, productType }}
              filterData={filterData}
            />
          </div>
        )}
      </div>
      {/* Contains Filter Section & Products List */}
      <div className={styles.filter_and_product_container}>
        <Filter params={{ ...searchParams, category: cat, productType }} />
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
              <span className="loader"></span>
            </div>
          }
        >
          <ProductsList
            searchParams={{ ...searchParams, category: cat, productType }}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
