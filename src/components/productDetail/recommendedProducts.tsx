import { getSimilarProductData } from "@/api";
import ProductCarousel from "@/common/carousels/productCarousel/productCarousel";

const RecommendedProducts = async ({ category, productType }: any) => {
  const data = await getSimilarProductData(category, productType);

  return (
    <div>
      <h1 style={{ paddingInline: "var(--margin-inline-laptop)" }}>
        Recommended Products
      </h1>
      <ProductCarousel data={data} />
    </div>
  );
};

export default RecommendedProducts;
