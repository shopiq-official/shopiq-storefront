import { getContent } from "@/api";
import Image from "next/image";

import styles from "./homeContentOne.module.css";
import Link from "next/link";

const HomeContentOne = async () => {
  const contents: any = await getContent();

  const banner1 = contents.contents[0]?.banner1;

  if (banner1[0]?.onClickUrl)
    return (
      <Link className={styles.static_section} href={banner1[0]?.onClickUrl}>
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE + banner1[0]?.mediaUrl}
          alt="banner 1"
          width={1500}
          height={1500}
          className="image_for_desktop"
        />
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE + banner1[0]?.mobMediaUrl}
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
        src={process.env.NEXT_PUBLIC_IMAGE + banner1[0]?.mediaUrl}
        alt="banner 1"
        width={1500}
        height={1500}
        className="image_for_desktop"
      />
      <Image
        src={process.env.NEXT_PUBLIC_IMAGE + banner1[0]?.mobMediaUrl}
        alt="banner 1"
        width={1500}
        height={1500}
        className={"image_for_mobile"}
      />
    </div>
  );
};

export default HomeContentOne;
