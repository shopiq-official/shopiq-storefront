import styles from "./products.module.css";
import { Filter } from "@/components/products/filter";
import { Suspense } from "react";
import ProductsList from "@/components/products/productsList";
import { FilterMobile } from "@/components/products/filterMobile";
import { getCategories, getCategoriesOfType, getCollections, getFilterData } from "@/api";
import Image from "next/image";

export async function generateStaticParams() {
  const categories: any = await getCategoriesOfType();

  let all_values = [];
  const p_types = Object.keys(categories).filter((val) => val);

  for (let i = 0; i < p_types.length; i++) {
    let p_t = p_types[i];

    if (categories[p_t].length === 0) {
      all_values.push([p_t, ""]);
    } else {
      for (let j = 0; j < categories[p_types[i]].length; j++) {
        all_values.push([p_t, categories[p_t][j]]);
      }
    }
  }

  const temp = p_types.map((product: any) => ({
    productType: `${product}`,
  }));

  const cats = await getCategories();

  console.log(cats);

  cats.forEach((v: any) => {
    temp.push({ productType: `${v.title}` });
  });

  temp.push({ productType: "new-launch" });
  temp.push({ productType: "best-seller" });
  temp.push({ productType: "featured" });
  console.log(temp);
  return temp;
}

const Page = async ({ searchParams, params }: any) => {
  // Fetch categories and filter data
  const category = await getCategories();
  const filterData = await getFilterData();
  const collection = await getCollections();
  let type = "";

  console.log(params.productType);

  // Determine the type based on productType or category if its other than that make it boolean.
  if (
    params.productType === "new-launch" ||
    params.productType === "best-seller" ||
    params.productType === "featured"
  ) {
    type = "boolean";
  } else {
    type =
      category.filter((v: any) => v.title === params.productType).length === 0
        ? "productType"
        : "category";
  }

  // This function returns the meta data i.e. meta title and meta description of category and collection 
  const getMetaData = () => {
    const val =
      type == "category"
        ? category.filter(
            (v: any) => encodeURI(v.title) === params.productType
          )
        : collection.filter(
            (v: any) => encodeURI(v.title) === params.productType
          );

    return val[0]?.metaData || {}; // Return the meta data or an empty object
  };

  return (
    <div>
      <head>
        <title>{getMetaData()?.metaTitle}</title>
        <meta
          name="description"
          content={getMetaData()?.metaDescription}
        ></meta>
      </head>
      <div>
        {searchParams.category ? (
          // Render based on the presence of searchParams.category
          <>
            {Array.isArray(searchParams.category) ? (
              // Render for array of categories
              <div className={styles.simple_hero}>
                <h1>shop</h1>
                <FilterMobile
                  params={
                    type === "productType"
                      ? {
                          ...searchParams,
                          productType: [decodeURIComponent(params.productType)],
                        }
                      : type === "category"
                      ? {
                          ...searchParams,
                          category: [decodeURIComponent(params.productType)],
                        }
                      : type === "boolean"
                      ? params.productType === "new-launch"
                        ? { ...searchParams, newLaunch: true }
                        : params.productType === "best-seller"
                        ? { ...searchParams, bestSeller: true }
                        : params.productType === "featured"
                        ? { ...searchParams, featured: true }
                        : {}
                      : {}
                  }
                  filterData={filterData}
                />
              </div>
            ) : (
              // Render for single category
              <>
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
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <div className={styles.simple_hero}>
                  <h1>{searchParams.category}</h1>
                  <FilterMobile
                    params={
                      type === "productType"
                        ? {
                            ...searchParams,
                            productType: [
                              decodeURIComponent(params.productType),
                            ],
                          }
                        : type === "category"
                        ? {
                            ...searchParams,
                            category: [decodeURIComponent(params.productType)],
                          }
                        : {}
                    }
                    filterData={filterData}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          // Render when directly category page opens like /category and not like ?category=anything
          <div className={styles.simple_hero}>
            <h1>shop</h1>
            <FilterMobile
              params={
                type === "productType"
                  ? {
                      ...searchParams,
                      productType: [decodeURIComponent(params.productType)],
                    }
                  : type === "category"
                  ? {
                      ...searchParams,
                      category: [decodeURIComponent(params.productType)],
                    }
                  : {}
              }
              filterData={filterData}
            />
          </div>
        )}
      </div>
      {/* Contains Filter Section & Products List */}
      <div className={styles.filter_and_product_container}>
        <Filter
          params={
            type === "productType"
              ? {
                  ...searchParams,
                  productType: [decodeURIComponent(params.productType)],
                }
              : type === "category"
              ? {
                  ...searchParams,
                  category: [decodeURIComponent(params.productType)],
                }
              : {}
          }
        />
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
            searchParams={
              type === "productType"
                ? {
                    ...searchParams,
                    productType: [decodeURIComponent(params.productType)],
                  }
                : type === "category"
                ? {
                    ...searchParams,
                    category: [decodeURIComponent(params.productType)],
                  }
                : type === "boolean"
                ? params.productType === "new-launch"
                  ? { ...searchParams, productType: "newLaunch" }
                  : params.productType === "best-seller"
                  ? { ...searchParams, productType: "bestSeller" }
                  : params.productType === "featured"
                  ? { ...searchParams, productType: "featured" }
                  : {}
                : {}
            }
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
