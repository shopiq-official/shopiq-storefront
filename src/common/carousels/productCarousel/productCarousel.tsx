"use client";

import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import styles from "./productCarousel.module.css";
import { ProductCard } from "@/common/productCard/productCard";
import usePrevNextButtons from "@/hooks/usePrevNextButtons";
import { Product } from "@/types";

const NextButton = dynamic(() => import("../buttons/nextBtn"));
const PrevButton = dynamic(() => import("../buttons/prevBtn"));

const ProductCarousel = ({ data }: { data: Product[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true },
    [Autoplay()]
  );

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {data?.map((product: Product, index: number) => {
            return (
              <div className={styles.embla__slide} key={index}>
                <ProductCard data={product} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} />
          <NextButton onClick={onNextButtonClick} />
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
