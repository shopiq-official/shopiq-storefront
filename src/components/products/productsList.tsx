import { ProductCard } from "@/common/productCard/productCard";
import styles from "./productList.module.css";
import { getProductByFilter } from "@/api";
import { convertParamsIntoQuery } from "@/lib/convertParamsIntoQuery";
import { LoadMoreBtn } from "./loadingMoreBtn";
import { Product } from "@/types";

const handleProductFilter = async (
  params: Record<string, string | string[]>
) => {
  let products = [];

  let total = 0;

  for (let i = 1; i <= Number(params?.page ? params?.page : 1); i++) {
    let queryString = convertParamsIntoQuery(params);

    let r = (await getProductByFilter(
      `limit=15&page=${i}&${queryString}`
    )) as unknown as { data: Product[]; total: number };

    products.push(...r.data);
    total = r.total;
  }

  return { products, total };
};

const ProductsList = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) => {
  // console.log(searchParams);
  const { products, total } = (await handleProductFilter(
    searchParams
  )) as unknown as { products: Product[]; total: number };

  return (
    <>
      <div className={styles.products_container}>
        {products?.map((product: Product, index: number) => {
          return <ProductCard data={product} key={index} />;
        })}
        <LoadMoreBtn
          total={total}
          searchParams={searchParams}
          len={products?.length}
        />
      </div>
    </>
  );
};

export default ProductsList;
