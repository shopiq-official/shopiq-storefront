"use client";

import React, { useEffect, useState } from "react";
import styles from "./deals.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { getProductById } from "@/api";
import "@splidejs/react-splide/css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProductCard = ({ products, shopBtn = true }: any) => {
  const [data, setData]: any = useState([]);
  const router = useRouter();

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = async () => {
    let temp = [];

    for (let i = 0; i < products.length; i++) {
      const response = await getProductById(products[i]);
      temp.push(response.product);
    }

    console.log(temp);

    setData(temp);
  };

  if (data.length === 0 || data.filter((val: any) => val).length === 0)
    return <></>;

  return (
    <div
      className={styles.product_card_container}
      id={"product_media_arrows"}
      style={{ cursor: "pointer" }}
    >
      <Splide
        options={{
          perPage: 1,
          perMove: 1,
          //   type: "loop",
          arrows: false,
          autoplay: false,
          height: "100%",
          pagination: true,
        }}
      >
        {data.map((product: any, index: number) => {
          console.log(product);
          return (
            <SplideSlide key={index}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  zIndex: 10000,
                  display: "flex",
                  padding: "5px",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onClick={() =>
                  router.push("/products/" + product?.seListing?.routeHandle)
                }
              >
                <div className={styles.product_image_and_text_gap}>
                  <Image
                    src={product?.mediaUrl[0]}
                    alt="..."
                    style={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "10px",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ lineHeight: ".9rem" }}>
                    <span
                      style={{
                        fontSize: ".8rem",
                        textTransform: "capitalize",
                        color: "white",
                      }}
                    >
                      {product.category}
                    </span>
                    <h2 className={styles.product_heading}>{product.title}</h2>
                  </div>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default ProductCard;
