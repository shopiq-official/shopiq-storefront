import { getContent } from "@/api";
import Image from "next/image";

import styles from "./homeContentOne.module.css";
import Link from "next/link";
import { Content } from "@/types";

const HomeContentOne = async () => {
  const contents = (await getContent()) as unknown as { contents: Content[] };

  const banner1 = contents.contents[0]?.banner1;

  if (banner1[0]?.onClickUrl)
    return (
      <Link className={styles.static_section} href={banner1[0]?.onClickUrl}>
        <Image
          src={banner1[0]?.mediaUrl ?? "/placeholder.jpg"}
          alt="banner 1"
          width={1500}
          height={1500}
          className="image_for_desktop"
        />
        <Image
          src={banner1[0]?.mobMediaUrl ?? "/placeholder.jpg"}
          alt="banner 1"
          width={1500}
          height={1500}
          className={"image_for_mobile"}
        />
      </Link>
    );

  return (
    <div className={styles.static_section}>
      <Image
        src={banner1[0]?.mediaUrl ?? "/placeholder.jpg"}
        alt="banner 1"
        width={1500}
        height={1500}
        className="image_for_desktop"
      />
      <Image
        src={banner1[0]?.mobMediaUrl ?? "/placeholder.jpg"}
        alt="banner 1"
        width={1500}
        height={1500}
        className={"image_for_mobile"}
      />
    </div>
  );
};

export default HomeContentOne;
