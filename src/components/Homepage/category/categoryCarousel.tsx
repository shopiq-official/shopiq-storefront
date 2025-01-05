"use client";

import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import styles from "./categorySection.module.css";
import { ProductCard } from "@/common/productCard/productCard";
import usePrevNextButtons from "@/hooks/usePrevNextButtons";
import Link from "next/link";
import Image from "next/image";
import { capitalize } from "@/lib/capitalize";
import { Category } from "@/types";

const NextButton = dynamic(
  () => import("../../../common/carousels/buttons/nextBtn")
);
const PrevButton = dynamic(
  () => import("../../../common/carousels/buttons/prevBtn")
);

const CategoryCarousel = ({ data }: { data: Category[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true },
    [Autoplay()]
  );
  //  console.log(data)
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  console.log(data);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {data?.map((val: Category, index: number) => {
            return (
              <div className={styles.embla__slide} key={index}>
                <Link
                  //   key={ind}
                  aria-label={val?.title}
                  href={"/" + val.title}
                  className={styles.category}
                  style={{ width: "100%", overflow: "hidden" }}
                >
                  {
                    <Image
                      src={
                        (Array.isArray(val?.media2) &&
                          val?.media2[0]?.mediaUrl) ||
                        "/placeholder.jpg"
                      }
                      width={1500}
                      height={1500}
                      alt="not found"
                      // onError={() => console.log("error")}
                    />
                  }
                  <h4>{capitalize(val?.title ?? "")}</h4>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {data?.length >= 4 && (
        <div className={styles.embla__controls}>
          <div className={styles.embla__buttons}>
            <PrevButton onClick={onPrevButtonClick} />
            <NextButton onClick={onNextButtonClick} />
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoryCarousel;
