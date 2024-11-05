import {
  getBestSeller,
  getByProductCategory,
  getByProductType,
  getCategories,
  getContent,
  getFeatured,
  getNewLaunch,
} from "@/api";

import { Suspense } from "react";

import FullWidthCarousel from "@/common/carousels/FullWidthCarousel/fullWidthCarousel";
import dynamic from "next/dynamic";
import DealsSection from "@/components/Homepage/dealsSection";
// import CarouselWithTabs from "@/components/Homepage/carouselWithTabs";
// import HomeContentOne from "@/components/Homepage/homeContentOne";
// import HomeContentTwo from "@/components/Homepage/homeContentTwo";
// import StatsSection from "@/components/Homepage/statsSection";

const CarouselWithTabs = dynamic(
  () => import("@/components/Homepage/carouselWithTabs"),
  { loading: () => <p>Loading Carousel With Tabs....</p> }
);

const HomeContentOne = dynamic(
  () => import("@/components/Homepage/homeContentOne"),
  { loading: () => <p>Loading Home Content One....</p> }
);

const HomeContentTwo = dynamic(
  () => import("@/components/Homepage/homeContentTwo"),
  { loading: () => <p>Loading Home Content Two....</p> }
);

const StatsSection = dynamic(
  () => import("@/components/Homepage/statsSection"),
  { loading: () => <p>Loading Stats Section....</p> }
);

const getHomeData = async () => {
  const contents: any = await getContent();
  const newLaunch: any = await getNewLaunch();
  const bestSeller: any = await getBestSeller();
  const featured: any = await getFeatured();
  const her: any = await getByProductType("her");
  const him: any = await getByProductType("him");
  const pride: any = await getByProductType("pride");
  const tshirts: any = await getByProductCategory("t-shirts");
  const hoodies: any = await getByProductCategory("hoodies");
  const dresses: any = await getByProductCategory("dresses");
  const yogaPants: any = await getByProductCategory("yoga pants");
  const shorts: any = await getByProductCategory("shorts");
  const toteBags: any = await getByProductCategory("tote bags");

  return {
    contents: contents.contents[0],
    newLaunch: newLaunch?.data,
    bestSeller: bestSeller?.data,
    featured: featured?.data,
    her: her?.data,
    him: him?.data,
    pride: pride?.data,
    tshirts: tshirts?.data,
    hoodies: hoodies?.data,
    dresses: dresses?.data,
    yogaPants: yogaPants?.data,
    shorts: shorts?.data,
    toteBags: toteBags?.data,
  };
};

const Page = async () => {
  const data = await getHomeData();

  return (
    <div>
       {/* main carousel  */}
      <FullWidthCarousel data={data.contents?.hero} />

      
       {/* product video section  */}
      <DealsSection />

      
      {/* this is for showing products with tabs at the top to swith between different category */}
      <CarouselWithTabs
        data={[
          {
            text: "New Launch",
            value: "new-launch",
            list: data?.newLaunch,
          },
          {
            text: "Best Seller",
            value: "best-seller",
            list: data?.bestSeller,
          },
          { text: "Featured", value: "featured", list: data?.featured },
        ]}
        selected="new-launch"
      />
 {/* Banner 1 */}
      <HomeContentOne />

      <CarouselWithTabs
        data={[
          {
            text: "Her",
            value: "her",
            list: data?.her,
          },
          {
            text: "Him",
            value: "him",
            list: data?.him,
          },
          { text: "Pride", value: "pride", list: data?.pride },
        ]}
        selected="her"
      />
{/* Banner 2 */}
      <HomeContentTwo />
      
      <CarouselWithTabs
        data={[
          {
            text: "T-shirts",
            value: "t-shirts",
            list: data?.tshirts,
          },
          {
            text: "Hoodies",
            value: "hoodies",
            list: data?.hoodies,
          },
          { text: "Dresses", value: "dresses", list: data?.dresses },
        ]}
        selected="t-shirts"
        type="category"
      />
    
       {/* Static section  */}
      <StatsSection />
    
      
      <CarouselWithTabs
        data={[
          {
            text: "Yoga Pants",
            value: "yoga pants",
            list: data?.yogaPants,
          },
          {
            text: "Shorts",
            value: "shorts",
            list: data?.shorts,
          },
          { text: "Tote Bags", value: "tote bags", list: data?.toteBags },
        ]}
        selected="yoga pants"
        type="category"
      />
     
    </div>
  );
};

export default Page;
