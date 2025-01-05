"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { getCategories } from "@/api";
import { capitalize } from "@/lib/capitalize";
import { Category } from "@/types";

const Navmenu: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const [showMoreProductdropdown, setShowMoreProductdropdown] = useState(false);

  return (
    <div className={styles.navmenu}>
      {categories?.length > 6 ? (
        <ul style={{ position: "relative" }}>
          {categories
            ?.sort(
              (a: Category, b: Category) =>
                (a?.priority ?? 0) - (b?.priority ?? 0)
            )
            ?.slice(0, 6)
            ?.map((val: Category, ind: number) => {
              return (
                <Link
                  href={`/${val?.title}`}
                  className={styles.nav_link}
                  key={ind}
                >
                  {" "}
                  <li className={styles.nav_item}>
                    {capitalize(val?.title ?? "-")}
                  </li>{" "}
                </Link>
              );
            })}
          <li
            // style={{ fontSize: "1rem" }}
            onMouseEnter={() => setShowMoreProductdropdown(true)}
            onMouseLeave={() => setShowMoreProductdropdown(false)}
          >
            {"More "}
            {">>"}
          </li>
          {showMoreProductdropdown && (
            <div
              onMouseEnter={() => setShowMoreProductdropdown(true)}
              onMouseLeave={() => setShowMoreProductdropdown(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "-30px",
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                zIndex: 999999,
                borderRadius: "10px",
              }}
            >
              <div
                className={styles.transparent}
                style={{
                  height: "2vh",
                  backgroundColor: "transparent",
                }}
              ></div>
              <div
                style={{
                  padding: "8px 15px",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                {categories
                  .sort(
                    (a: Category, b: Category) =>
                      (a.priority ?? 0) - (b.priority ?? 0)
                  )
                  .slice(6, categories?.length)
                  .map((val: Category, ind: number) => {
                    return (
                      <Link
                        key={ind}
                        href={`/products?category=${val?.title}`}
                        className={styles.nav_link}
                      >
                        {" "}
                        <li className={styles.nav_item}>
                          {capitalize(val?.title ?? "-")}
                        </li>{" "}
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}
        </ul>
      ) : (
        <ul>
          {categories?.map((val: Category, ind: number) => {
            return (
              <Link
                key={ind}
                href={`/products?category=${val?.title}`}
                className={styles.nav_link}
              >
                {" "}
                <li className={styles.nav_item}>
                  {capitalize(val?.title ?? "-")}
                </li>{" "}
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Navmenu;
