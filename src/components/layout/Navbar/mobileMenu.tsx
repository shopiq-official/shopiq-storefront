import React, { useEffect, useState } from "react";
import styles from "./mobileMenu.module.css";

import Link from "next/link";

import RightIcon from "@/assets/Icons/nav/arrow.svg";

import { capitalize } from "@/lib/capitalize";
import { Category } from "@/types";
import { social_media_links } from "@/lib/constants";

interface MobileMenuProps {
  categories: Category[];
  open: boolean;
  data: Record<string, string[]>;
  onClose: () => void;
}

const MobileMenu = ({ categories, open, data, onClose }: MobileMenuProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <div
      className={`${styles.container} ${open && styles.container_active}`}
      style={{ overflow: "hidden" }}
      onClick={onClose}
    >
      <div
        className={styles.inner_container}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <ul>
          <Link href={"/products"} onClick={onClose}>
            <li>Shop</li>
          </Link>
          {categories
            ?.sort(
              (a: Category, b: Category) =>
                (a.priority ?? 0) - (b?.priority ?? 0)
            )
            ?.map((val: Category, ind: number) => {
              return (
                <Link
                  key={ind}
                  href={`/${val?.title}`}
                  className={styles.nav_link}
                >
                  {" "}
                  <li
                    className={styles.nav_item}
                    onClick={onClose}
                    // style={{ textTransform: "uppercase" }}
                  >
                    {capitalize(val?.title ?? "-")}
                  </li>{" "}
                </Link>
              );
            })}
        </ul>

        <ul className={styles.social_icons}>
          {social_media_links.map(
            (val: Record<string, string>, index: number) => {
              return (
                <li key={index} onClick={onClose}>
                  <Link key={index} href={val.link}>
                    <val.icon />
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
