"use client";
import styles from "./deals.module.css";
import SmVideoSection from "./SmVideoSection";

const MobileView = ({ medias }: any) => {
  return (
    <div className={styles.mobile_container}>
      {medias.map((media: any, index: number) => (
        <SmVideoSection vid={media} key={index} index={index} />
      ))}
    </div>
  );
};

export default MobileView;
