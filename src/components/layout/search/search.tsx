"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./search.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Close from "@/assets/Icons/cross.svg";
import SearchIcon from "@/assets/Icons/nav/search.svg";
import axios from "axios";
import { capitalize } from "@/lib/capitalize";
import { searchProducts } from "@/api";

type Props = {
  open: boolean;
  onClose: () => void;
  categories: any;
  bestSeller: any;
};

const Search = (props: Props) => {
  const [search, setSearch] = React.useState("");
  const [results, setResults]: any = React.useState([]);
  const initialLoad = useRef(false);

  const router = useRouter();

  useEffect(() => {
    let delayDebounceFn: any;
    if (initialLoad.current) {
      delayDebounceFn = setTimeout(() => {
        getData();
      }, 1000);
    } else {
      initialLoad.current = true;
    }

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const getData = () => {
    if (search !== "") {
      searchProducts(search)
        .then((res: any) => {
          setResults(res.data);
        })
        .catch((err: any) => {});
    } else {
      return setResults([]);
    }
  };

  if (!props.open) return <></>;

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.main}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={styles.header}>
            <div className={styles.search_input}>
              <SearchIcon className={styles.search_icon} />
              <input
                autoFocus
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="search_input_box"
              />
              <span className={styles.cross} onClick={() => props.onClose()}>
                <span className={styles.inner_cross}>
                  <Close />
                </span>
              </span>
            </div>
          </div>
          <div className={styles.results}>
            {search === "" ? (
              <div className={styles.default_results}>
                <div>
                  <h3>Popular Searches </h3>
                  <div
                    className={styles.default_categories}
                    onClick={() => props.onClose()}
                  >
                    {props.categories?.map((val: any, ind: any) => {
                      return (
                        <p
                          key={ind}
                          onClick={() => {
                            router.push("/products?category=" + val?.title);
                          }}
                        >
                          {val?.title}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h3>Trending Now </h3>
                  <div
                    className={styles.trending_now}
                    onClick={() => props.onClose()}
                  >
                    {props.bestSeller?.map((val: any, ind: any) => {
                      return (
                        <div
                          onClick={() => {
                            router.push(
                              "/products/" + val?.seListing?.routeHandle
                            );
                          }}
                          style={{ cursor: "pointer" }}
                          key={ind}
                        >
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_IMAGE + val.mediaUrl[0]
                            }
                            alt={val?.title}
                            height={1500}
                            width={1500}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              // gap: "4px",
                            }}
                          >
                            <p>{capitalize(val.category)}</p>
                            <h5 key={ind}>{capitalize(val?.title)}</h5>
                            <h4>Rs {val.pricing.price}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <ul>
                {results.map((item: any, index: any) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        props.onClose();
                        router.push(`/products/${item.seListing.routeHandle}`);
                      }}
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE}${item?.mediaUrl[0]}`}
                        alt=""
                      />
                      <div>
                        <h3>{capitalize(item?.title)}</h3>
                        <h4>{capitalize(item.category)}</h4>
                        <p>₹{item.pricing.price}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
