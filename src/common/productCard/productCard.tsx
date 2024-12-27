import Link from "next/link";

import styles from "./productCard.module.css";
import { Suspense, useState } from "react";
import CardImage from "../image/Image";

export const ProductCard = ({ data }: any) => {
  const multipleImages = data?.mediaUrl?.length > 1;

  return (
    <Link
      aria-label={data.title}
      href={`/products/${data.seListing?.routeHandle}`}
      style={{ width: "100%", overflow: "hidden" }}
    >
      <div className={styles.card_main}>
        {!multipleImages && (
          <div className={styles.cardImage}>
            <Suspense fallback={<p>Loading......</p>}>
              <CardImage
                src={`${data?.mediaUrl[0]}`}
                alt="..."
                className={styles.img1}
              />
            </Suspense>
          </div>
        )}
        {multipleImages && (
          <div className={styles.cardImageMultiple}>
            <CardImage
              src={`${data?.mediaUrl[0]}`}
              alt="..."
              className={styles.img1}
            />
            <CardImage
              src={`${data?.mediaUrl[1]}`}
              alt="..."
              className={styles.img2}
            />
          </div>
        )}

        <div className={styles.card_about}>
          <div className={styles.card_details}>
            <h5 style={{ textTransform: "capitalize" }}>{data?.category}</h5>
            <h4> ₹{data?.pricing?.price} </h4>
          </div>
          <p style={{ textTransform: "capitalize" }}>{data?.title}</p>
        </div>
      </div>
    </Link>
  );
};
