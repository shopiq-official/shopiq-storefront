import { ProductCard } from "@/common/productCard/productCard";
import styles from "./productList.module.css";
import { getProductByFilter } from "@/api";
import { convertParamsIntoQuery } from "@/lib/convertParamsIntoQuery";
import { LoadMoreBtn } from "./loadingMoreBtn";

const handleProductFilter = async (params: any) => {
  let products = [];

  let total = 0;

  for (let i = 1; i <= Number(params?.page ? params?.page : 1); i++) {
    let queryString = convertParamsIntoQuery(params);

    let r: any = await getProductByFilter(`limit=15&page=${i}&${queryString}`);

    products.push(...r.data);
    total = r.total;
  }

  return { products, total };
};

const ProductsList = async ({ searchParams }: any) => {
  console.log(searchParams);
  const { products, total }: any = await handleProductFilter(searchParams);

  return (
    <>
      <div className={styles.products_container}>
        {products?.map((product: any, index: any) => {
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
