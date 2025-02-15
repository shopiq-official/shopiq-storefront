"use client";
import styles from "./banner.module.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Discount } from "@/types";

const Banners: React.FC<{ data: Discount[] }> = ({ data }) => {
  const pathname = usePathname();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);

  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    setInnerWidth(window?.innerWidth);
  }, []);

  if (pathname === "/videos" && innerWidth <= 700) return <></>;

  if (data?.length === 0) return <></>;

  return (
    <div className={styles.nav_first_row}>
      <div className={styles.embla_viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {data.map((val: Discount, index: number) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.event_carousel_image}>
                <div className={styles.overlay_text}>
                  <p>
                    {val?.discountTitle}{" "}
                    {val?.counponCode && `- ${val?.counponCode}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banners;
