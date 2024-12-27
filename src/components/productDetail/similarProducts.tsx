"use client";
import SimilarIcon from "@/assets/Icons/similar.svg";
import { useState } from "react";
import styles from "./similarProducts.module.css";
import Link from "next/link";
import Image from "next/image";
import CloseIcon from "@/assets/Icons/cross.svg";
import { Product } from "@/types";

const SimilarProducts = ({ similarProduct, crossSellProducts }: any) => {
  const [modal, setModal] = useState(false);
  const [section, setSection] = useState(
    similarProduct.length !== 0 ? "similar" : "crosssell"
  );

  return (
    <>
      <SimilarIcon
        className={styles.main_btn}
        onClick={() => setModal(true)}
        style={{ background: "white", padding: "2px", borderRadius: "5px" }}
      />
      {modal && (
        <div className={`${styles.model} ${styles.open}`}>
          <div
            className={styles.trans_container}
            onClick={() => {
              setModal(false);
            }}
          ></div>
          <div className={styles.container}>
            <div className={styles.container_top}>
              <h3
                onClick={() => setSection("similar")}
                style={{
                  borderBottom:
                    section == "similar"
                      ? "1px solid var(--body)"
                      : "transparent",
                }}
              >
                Similar Styles
              </h3>
              {crossSellProducts.length !== 0 && (
                <h3
                  onClick={() => setSection("crosssell")}
                  style={{
                    borderBottom:
                      section == "crosssell"
                        ? "1px solid var(--body)"
                        : "transparent",
                  }}
                >
                  Pair it with
                </h3>
              )}
            </div>
            <div className={styles.all_images}>
              <div className={styles.similarImages}>
                {section == "similar" ? (
                  <>
                    {similarProduct?.length > 0 &&
                      similarProduct.map((val: any, ind: number) => {
                        return (
                          <Link href={"/products/" + val?.slug} key={ind}>
                            <div className={styles.main_card} key={ind}>
                              <Image
                                src={val?.mediaUrl[0]}
                                alt="products not found"
                                width={1500}
                                height={1500}
                              />
                              <p>{val?.category}</p>
                              <h4>{val?.title}</h4>
                            </div>
                          </Link>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {crossSellProducts?.length > 0 &&
                      crossSellProducts.map((val: any, ind: number) => {
                        return (
                          <Link href={"/products/" + val?.slug} key={ind}>
                            <div className={styles.main_card} key={ind}>
                              <Image
                                src={val?.mediaUrl[0]}
                                alt="products not found"
                                width={1500}
                                height={1500}
                              />
                              <p>{val?.category}</p>
                              <h4>{val?.title}</h4>
                            </div>
                          </Link>
                        );
                      })}
                  </>
                )}
              </div>
            </div>
            <div
              className={styles.cross}
              onClick={() => {
                setModal(false);
              }}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimilarProducts;
