"use client";

import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./homeContentCarousel.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import usePrevNextButtons from "@/hooks/usePrevNextButtons";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

const NextButton = dynamic(() => import("@/common/carousels/buttons/nextBtn"));
const PrevButton = dynamic(() => import("@/common/carousels/buttons/prevBtn"));

type Props = any;

const HomeContentCarousel = ({ data }: Props) => {
  const router = useRouter();
  const [loadedIndexes, setLoadedIndexes] = useState([data[0]]); // State to track loaded indexes
  const [loop, setLoop] = useState(false); // State to manage looping of the carousel

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }), // Autoplay configuration
  ]);

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi); // Custom hook for button click handlers

  const handleLoadingComplete = () => {
    // Function to handle loading of images/videos
    if (data.length > loadedIndexes.length) {
      setLoadedIndexes((prev) => {
        return [...prev, data[prev.length]]; // Load next item
      });
    } else if (data.length === loadedIndexes.length) {
      setLoop(true); // Set loop to true when all items are loaded
    }
  };

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {loadedIndexes.map((val: any, index: number) => (
            <div
              className={styles.embla__slide}
              key={index}
              style={{
                cursor:
                  val?.onClickUrl && !val.isButton ? "pointer" : "default", // Change cursor based on item type
              }}
              onClick={() => {
                if (val?.onClickUrl && !val.isButton) {
                  router.push(val.onClickUrl); // Navigate on click if valid URL
                }
              }}
            >
              <div className={styles.event_carousel_image}>
                <div className={styles.overlay_text}>
                  <h1>{val?.title}</h1>
                  {val?.isButton && (
                    <button
                      aria-label={"Hero Action"}
                      onClick={() => router.push(val.onClickUrl)} // Navigate on button click
                    >
                      {val.buttonValue}
                    </button>
                  )}
                </div>

                <div className={styles.more_than_700}>
                  {val?.mediaUrl.split(".")[1] == "webp" ||
                  val?.mediaUrl.split(".")[1] == "jpeg" ||
                  val?.mediaUrl.split(".")[1] == "jpg" ||
                  val?.mediaUrl.split(".")[1] == "png" ? (
                    <Image
                      src={process.env.NEXT_PUBLIC_IMAGE + val?.mediaUrl}
                      alt="..."
                      width={1500}
                      height={1500}
                      onLoad={handleLoadingComplete} // Handle loading completion
                      priority={index == 0}
                    />
                  ) : (
                    <div style={{ height: "100%", width: "100%" }}>
                      <video
                        autoPlay
                        muted
                        playsInline
                        loop
                        style={{
                          width: "100vw",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top",
                          position: "relative",
                          pointerEvents: "none",
                        }}
                        className="react-player"
                        onLoadedData={handleLoadingComplete} // Handle loading completion for video
                      >
                        <source
                          src={`${process.env.NEXT_PUBLIC_IMAGE}/${val?.mediaUrl}`}
                        />
                      </video>
                    </div>
                  )}
                </div>

                <div className={styles.less_than_700}>
                  {val?.mobMediaUrl.split(".")[1] == "webp" ||
                  val?.mobMediaUrl.split(".")[1] == "jpeg" ||
                  val?.mobMediaUrl.split(".")[1] == "jpg" ||
                  val?.mobMediaUrl.split(".")[1] == "png" ? (
                    <Image
                      src={process.env.NEXT_PUBLIC_IMAGE + val?.mobMediaUrl}
                      alt="..."
                      width={391}
                      height={695}
                      quality={10}
                      priority={index == 0 ? true : false}
                      onLoadingComplete={handleLoadingComplete} // Handle loading completion for mobile image
                    />
                  ) : (
                    <div style={{ height: "100%", width: "100%" }}>
                      <video
                        autoPlay
                        muted
                        playsInline
                        loop
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top",
                          position: "relative",
                          pointerEvents: "none",
                        }}
                        className="react-player"
                        onLoadedData={handleLoadingComplete} // Handle loading completion for mobile video
                      >
                        <source
                          src={`${process.env.NEXT_PUBLIC_IMAGE}/${val?.mobMediaUrl}`}
                        />
                      </video>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} /> {/* Previous button */}
          <NextButton onClick={onNextButtonClick} /> {/* Next button */}
        </div>
      </div>
    </section>
  );
};

export default HomeContentCarousel;
