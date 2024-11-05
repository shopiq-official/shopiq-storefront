import React from "react";
import styles from "./deals.module.css";
import ImageAndVideoSwitch from "./imageAndVideoSwitch";
import MobileView from "./mobileView";
import { Metadata } from "next";
import { getAllProductMedia } from "@/api";

export const metadata: Metadata = {
  title: "Deals | ENTER_WEBSITE_NAME",
  description: "DESCRIPTION",
};

const Deals = async () => {
  const response = await getAllProductMedia();

  const medias = [...response?.productMedias];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>Product Videos</div>
        <div className={styles.videos_container}>
          {medias.map((media: any, index: any) => {
            return <ImageAndVideoSwitch media={media} key={index} />;
          })}
        </div>
      </div>
      {/* mobile */}
      {/* <div className={styles.mobile_main_container}> */}
      <MobileView medias={medias} />
      {/* </div> */}
    </>
  );
};

export default Deals;
