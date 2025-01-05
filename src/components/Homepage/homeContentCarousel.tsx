"use client";

import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./homeContentCarousel.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import usePrevNextButtons from "@/hooks/usePrevNextButtons";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import { Content, Hero } from "@/types";

const NextButton = dynamic(() => import("@/common/carousels/buttons/nextBtn"));
const PrevButton = dynamic(() => import("@/common/carousels/buttons/prevBtn"));

type Props = { data: Hero[] };

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
          {loadedIndexes.map((val: Hero, index: number) => (
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
                  {val?.isButton && val?.onClickUrl && (
                    <button
                      aria-label={"Hero Action"}
                      onClick={() => router.push(val?.onClickUrl ?? "")} // Navigate on button click
                    >
                      {val.buttonValue}
                    </button>
                  )}
                </div>

                <div className={styles.more_than_700}>
                  {val?.mediaUrl?.endsWith("webp") ||
                  val?.mediaUrl?.endsWith("jpeg") ||
                  val?.mediaUrl?.endsWith("jpg") ||
                  val?.mediaUrl?.endsWith("png") ? (
                    <Image
                      src={val?.mediaUrl || "/placeholder.jpg"} // Desktop image
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
                        <source src={`${val?.mediaUrl}`} />
                      </video>
                    </div>
                  )}
                </div>

                <div className={styles.less_than_700}>
                  {val?.mediaUrl?.endsWith("webp") ||
                  val?.mediaUrl?.endsWith("jpeg") ||
                  val?.mediaUrl?.endsWith("jpg") ||
                  val?.mediaUrl?.endsWith("png") ? (
                    <Image
                      src={val?.mobMediaUrl ?? "/placeholder.jpg"} // Mobile image
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
                        <source src={`${val?.mobMediaUrl}`} />
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
