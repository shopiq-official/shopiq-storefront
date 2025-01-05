"use client";

import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./fullWidthCarousel.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import usePrevNextButtons from "@/hooks/usePrevNextButtons";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import { Hero } from "@/types";

const NextButton = dynamic(() => import("../buttons/nextBtn"));
const PrevButton = dynamic(() => import("../buttons/prevBtn"));

const FullWidthCarousel = ({ data }: { data: Hero[] }) => {
  const router = useRouter();
  const [loadedIndexes, setLoadedIndexes] = useState([data[0]]);
  const [loop, setLoop] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: loop }, [
    Autoplay({ delay: 5000 }),
  ]);

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const handleLoadingComplete = () => {
    if (data.length > loadedIndexes.length) {
      setLoadedIndexes((prev) => {
        return [...prev, data[prev.length]];
      });
    } else if (data.length === loadedIndexes.length) {
      setLoop(true);
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
                  val?.onClickUrl && !val.isButton ? "pointer" : "default",
              }}
              onClick={() => {
                if (val?.onClickUrl && !val.isButton) {
                  router.push(val.onClickUrl);
                }
              }}
            >
              <div className={styles.event_carousel_image}>
                <div className={styles.overlay_text}>
                  <h1>{val?.title}</h1>
                  {val?.isButton && val?.onClickUrl && (
                    <button
                      aria-label={"Hero Action"}
                      onClick={() => router.push(val.onClickUrl ?? "/")}
                    >
                      {val.buttonValue}
                    </button>
                  )}
                </div>

                {val.mediaUrl && (
                  <div className={styles.more_than_700}>
                    {val?.mediaUrl.endsWith("webp") ||
                    val?.mediaUrl.endsWith("jpeg") ||
                    val?.mediaUrl.endsWith("jpg") ||
                    val?.mediaUrl.endsWith("png") ? (
                      <Image
                        src={val?.mediaUrl || "/placeholder.jpg"}
                        alt="..."
                        width={1500}
                        height={1500}
                        onLoad={handleLoadingComplete}
                        priority={index == 0}
                      />
                    ) : (
                      <>
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
                            onLoadedData={handleLoadingComplete}
                          >
                            <source src={`${val?.mediaUrl}`} />
                          </video>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {val.mobMediaUrl && (
                  <div className={styles.less_than_700}>
                    {val?.mobMediaUrl.endsWith("webp") ||
                    val?.mobMediaUrl.endsWith("jpeg") ||
                    val?.mobMediaUrl.endsWith("jpg") ||
                    val?.mobMediaUrl.endsWith("png") ? (
                      <Image
                        src={val?.mobMediaUrl || "/placeholder.jpg"}
                        alt="..."
                        width={391}
                        height={695}
                        quality={10}
                        priority={index == 0 ? true : false}
                        onLoadingComplete={handleLoadingComplete}
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
                          onLoadedData={handleLoadingComplete}
                        >
                          <source src={`${val?.mobMediaUrl}`} />
                        </video>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
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

export default FullWidthCarousel;
