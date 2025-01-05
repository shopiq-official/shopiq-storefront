import {
  getBestSeller,
  getContent,
  getDiscountsApi,
  getFeatured,
  getNewLaunch,
} from "@/api";

import { Suspense } from "react";

import FullWidthCarousel from "@/common/carousels/FullWidthCarousel/fullWidthCarousel";
import dynamic from "next/dynamic";

import CategorySection from "@/components/Homepage/category/categorySection";
import { Content, Product } from "@/types";

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

const getHomeData = async () => {
  const contents = (await getContent()) as unknown as { contents: Content[] };
  const newLaunch = (await getNewLaunch()) as unknown as { data: Product[] };
  const bestSeller = (await getBestSeller()) as unknown as { data: Product[] };
  const featured = (await getFeatured()) as unknown as { data: Product[] };

  return {
    contents: contents.contents?.length ? contents.contents[0] : null,
    newLaunch: newLaunch?.data,
    bestSeller: bestSeller?.data,
    featured: featured?.data,
  };
};

const Page = async () => {
  const data = await getHomeData();

  // console.log(data);
  console.log(data?.contents?.hero);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5vh" }}>
      {data?.contents && data?.contents?.hero?.length && (
        <FullWidthCarousel data={data.contents?.hero} />
      )}

      <CategorySection />

      {data?.featured?.length > 0 && (
        <CarouselWithTabs
          title="Raw Products for you!"
          description={"Lorem ipsum doror samet"}
          data={data?.featured}
          link={"/products?isFeatured=true"}
        />
      )}
      {data?.contents && <HomeContentOne />}

      {/* <DealsSection /> */}

      {data?.bestSeller?.length > 0 && (
        <CarouselWithTabs
          title="Most popular products near you!"
          description={"Lorem ipsum doror samet"}
          data={data?.bestSeller}
          link={"/products?bestSeller=true"}
        />
      )}

      {/* {data?.contents && <HomeContentTwo />} */}
    </div>
  );
};

export default Page;
