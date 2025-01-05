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
import { Category, Product } from "@/types";

type Props = {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  bestSeller: Product[];
};

const Search = (props: Props) => {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState<Product[]>([]);
  const initialLoad = useRef(false);

  const router = useRouter();

  useEffect(() => {
    let delayDebounceFn: ReturnType<typeof setTimeout>;
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
        .then((res: Record<string, any>) => {
          setResults(res.data);
        })
        .catch((err: Error) => {});
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
                    {props.categories?.map((val: Category, ind: number) => {
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
                    {props.bestSeller?.map((val: Product, ind: number) => {
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
                              val?.mediaUrl
                                ? val.mediaUrl[0]
                                : "/placeholder.jpg"
                            }
                            alt={val?.title ?? ""}
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
                            <p>{capitalize(val.category ?? "-")}</p>
                            <h5 key={ind}>{capitalize(val?.title ?? "-")}</h5>
                            <h4>Rs {val?.pricing?.price}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <ul>
                {results.map((item: Product, index: number) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        props.onClose();
                        router.push(
                          `/products/${item?.seListing?.routeHandle}`
                        );
                      }}
                    >
                      <Image
                        src={
                          item?.mediaUrl
                            ? `${item?.mediaUrl[0]}`
                            : "/placeholder.jpg"
                        }
                        alt=""
                        height={500}
                        width={500}
                      />
                      <div>
                        <h3>{capitalize(item?.title ?? "- ")}</h3>
                        <h4>{capitalize(item.category ?? "-")}</h4>
                        <p>₹{item.pricing?.price}</p>
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
