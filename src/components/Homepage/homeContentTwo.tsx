import { getContent } from "@/api";
import Image from "next/image";

import styles from "./homeContentOne.module.css";
import Link from "next/link";
import HomeContentCarousel from "./homeContentCarousel";
import { Content } from "@/types";

const HomeContentTwo = async () => {
  const contents = (await getContent()) as unknown as { contents: Content[] };

  const banner2 = contents.contents[0]?.banner2;

  console.log(banner2);

  if (banner2.length === 0) return <></>;

  console.log(banner2[0].onClickUrl);

  if (banner2.length === 1) {
    if (banner2[0]?.onClickUrl)
      return (
        <Link
          className={styles.static_section}
          href={banner2[0]?.onClickUrl}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={banner2[0]?.mediaUrl ?? "/placeholder.jpg"}
            alt="banner 1"
            width={1500}
            height={1500}
            className="image_for_desktop"
          />
          <Image
            src={banner2[0]?.mobMediaUrl ?? "/placeholder.jpg"}
            alt="banner 1"
            width={1500}
            height={1500}
            className="image_for_mobile"
          />
        </Link>
      );

    return (
      <div className={styles.static_section}>
        <Image
          src={banner2[0]?.mediaUrl ?? "/placeholder.jpg"}
          alt="banner 1"
          width={1500}
          height={1500}
          className="image_for_desktop"
        />
        <Image
          src={banner2[0]?.mobMediaUrl ?? "/placeholder.jpg"}
          alt="banner 1"
          width={1500}
          height={1500}
          className="image_for_mobile"
        />
      </div>
    );
  }

  return <HomeContentCarousel data={banner2} />;
};

export default HomeContentTwo;
