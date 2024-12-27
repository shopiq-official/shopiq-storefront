"use client";
import styles from "./productImages.module.css";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import MyReactImageMagnify from "./MyReactImageMagnify";
import SimilarProduct from "./similarProducts";
import { EmblaOptionsType } from "embla-carousel";

const ProductImages = ({ data, similar }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();

  const [view, setView] = useState<"x" | "y">("x");

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: view,
  });

  useEffect(() => {
    setView(window.length > 700 ? "y" : "x");
  }, []);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className={styles.container}>
      <div className={styles.secondary_images}>
        <div className={styles.embla_thumbs__viewport} ref={emblaThumbsRef}>
          <div className={styles.embla_thumbs__container}>
            {data.map((img: any, index: number) => {
              return (
                <Thumb
                  key={index}
                  src={img}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.main_image} ref={emblaMainRef}>
        <div className={styles.embla__container}>
          {data.map((img: any, index: number) => {
            return (
              <div key={index} className={styles.embla__slides}>
                <MyReactImageMagnify img={img} />
              </div>
            );
          })}
        </div>
      </div>
      {(similar.similarProduct.length !== 0 ||
        similar.crossSellProducts.length !== 0) && (
        <SimilarProduct
          similarProduct={similar.similarProduct || []}
          crossSellProducts={similar.crossSellProducts || []}
        />
      )}
    </div>
  );
};

const Thumb = (props: any) => {
  const { selected, index, onClick, src } = props;

  return (
    <div
      className={`${styles.embla_thumbs__slide} ${
        selected && styles.embla_thumbs__slide__selected
      }`}
    >
      <button
        onClick={onClick}
        type="button"
        className={styles.embla_thumbs__slide_img}
      >
        {src.split(".").splice(-1)[0] === "webp" ? (
          <Image
            src={src}
            width={100}
            height={100}
            alt="product images"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <video
              autoPlay={false}
              muted={true}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            >
              <source src={src} />
            </video>
            <div
              style={{
                position: "absolute",
                background: "rgba(0,0,0,0)",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default ProductImages;
