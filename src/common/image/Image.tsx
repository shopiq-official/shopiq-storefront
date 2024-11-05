"use client";

import Image from "next/image";

const CardImage = (props: any) => {
  return (
    <Image
      src={props?.src}
      alt={props?.alt}
      height={500}
      width={500}
      className={props?.className}
      onError={() => {}}
    />
  );
};

export default CardImage;
