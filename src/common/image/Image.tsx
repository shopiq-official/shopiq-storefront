"use client";

import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CardImage: React.FC<ImageProps> = (props) => {
  return (
    <Image
      src={props?.src || "/placeholder.jpg"}
      alt={props?.alt}
      height={500}
      width={500}
      className={props?.className}
      onError={() => {}}
    />
  );
};

export default CardImage;
