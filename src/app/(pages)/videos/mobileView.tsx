"use client";
import { ProductMediaTypes } from "@/types/productMediaTypes";
import styles from "./deals.module.css";
import SmVideoSection from "./SmVideoSection";

const MobileView = ({ medias }: { medias: ProductMediaTypes[] }) => {
  return (
    <div className={styles.mobile_container}>
      {medias.map((media: ProductMediaTypes, index: number) => (
        <SmVideoSection vid={media} key={index} index={index} />
      ))}
    </div>
  );
};

export default MobileView;
